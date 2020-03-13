package main

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

var builtinTypes = map[string]string{
	"opc:Boolean":    "boolean",
	"opc:Byte":       "uint8",
	"opc:SByte":      "int8",
	"opc:Int16":      "int16",
	"opc:Int32":      "int32",
	"opc:Int64":      "int64",
	"opc:UInt16":     "uint16",
	"opc:UInt32":     "uint32",
	"opc:UInt64":     "uint64",
	"opc:Float":      "float32",
	"opc:Double":     "float64",
	"opc:String":     "string",
	"opc:DateTime":   "Date",
	"opc:ByteString": "ByteString",
	"opc:Guid":       "Guid",
}

func main() {
	filename := filepath.Join("..", "..", "schema", "Opc.Ua.Types.bsd")
	f, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	dict := new(typeDictionary)
	if err := xml.NewDecoder(f).Decode(&dict); err != nil {
		panic(err)
	}

	var b bytes.Buffer

	b.WriteString(`
export const Type = (name: string) => (
  target: object,
  key: string | symbol
): void => {
  Reflect.defineMetadata('design:type', name, target, key)
}

export const TypeArray = (name: string) => (
  target: object,
  key: string | symbol
): void => {
  Reflect.defineMetadata('design:type', 'Array', target, key)
  Reflect.defineMetadata('design:subtype', name, target, key)
}
	`)

	// imports
	if err := tmplImports.Execute(&b, nil); err != nil {
		log.Fatal(err)
	}

	// loop over all enumerated types
	for _, t := range dict.EnumeratedTypes {

		// loop over all enumerated values for each enumerated type
		// save zero value for every enumerated type
		for i, v := range t.EnumeratedValues {
			if i == 0 {
				t.ZeroValue = v.Name
				break
			}
		}

		if err := tmplEnum.Execute(&b, t); err != nil {
			log.Fatal(err)
		}
	}

	// structured types
	for _, t := range dict.StructuredTypes {
		// tns:DataTypeSchemaHeader

		if !(t.BaseType == "ua:ExtensionObject" ||
			t.BaseType == "tns:DataTypeDefinition" ||
			t.BaseType == "tns:DataTypeSchemaHeader" ||
			t.BaseType == "tns:DataTypeDescription" ||
			t.BaseType == "tns:PubSubGroupDataType" ||
			t.BaseType == "tns:EnumValueType" ||
			t.BaseType == "tns:UserIdentityToken") {
			continue
		}

		// skip structured types with no fields to prevent empty constructors
		if len(t.Fields) == 0 {
			continue
		}

		fields := []*field{}

		// map field types
		for _, f := range t.Fields {

			// filter out LengthFields
			// e.g. NoOfServers because they are part of the following array
			if t.IsLengthField(f) {
				continue
			}

			// check enumerated types
			for _, et := range dict.EnumeratedTypes {
				if f.GetReplacedTypeName() == et.Name {
					f.EnumType = et.GetType()
					f.ZeroValue = et.ZeroValue
				}
			}

			// check opaque types
			// status code is an opaque type
			for _, ot := range dict.OpaqueTypes {
				if f.GetReplacedTypeName() == ot.Name {
					f.EnumType = ot.GetType()
					f.ZeroValue = "OK"
				}
			}

			fields = append(fields, f)
		}

		t.Fields = fields

		if err := tmplClass.Execute(&b, t); err != nil {
			log.Fatal(err)
		}
	}

	out := filepath.Join("..", "..", "src", "ua", "generated.ts")
	if err := ioutil.WriteFile(out, b.Bytes(), 0644); err != nil {
		panic(err)
	}

	log.Printf("Wrote %s", out)
}

var tmplImports = template.Must(template.New("").Parse(`
export interface Request {
  RequestHeader: RequestHeader
}

import 'reflect-metadata'
import LocalizedText from './LocalizedText'
import ExtensionObject from './ExtensionObject'
import Guid from './Guid'
import NodeId from './NodeId'
import ExpandedNodeId from './ExpandedNodeId'
import DiagnosticInfo from './DiagnosticInfo'
import QualifiedName from './QualifiedName'
import Variant from './Variant'
import DataValue from './DataValue'
import { StatusCodeOK } from './StatusCode'
`))

var tmplEnum = template.Must(template.New("").Parse(`
export type {{ .Name }} = {{ .GetType }}
{{ $Name := .Name }}
{{ range $v := .EnumeratedValues -}}
	export const {{ $Name }}{{ $v.Name }}: {{ $Name }} = {{ $v.Value }}
{{ end -}}
`))

var tmplClass = template.Must(template.New("").Parse(`
export class {{ .Name }} {
{{- range $v := .Fields }}
  {{ .GetDecorator }}
  public {{ $v.Name }}: {{ $v.GetTypeScriptType }}
{{- end }}

  constructor(options?: {
    {{ range $v := .Fields }}{{ $v.Name }}?: {{ $v.GetTypeScriptType }}
    {{ end }}
  }) {
    {{ range $v := .Fields }}this.{{ $v.Name }} = options?.{{ $v.Name }} ?? {{ $v.GetZeroValue }}
    {{ end }}
  }
}
`))

type typeDictionary struct {
	XMLName         xml.Name          `xml:"TypeDictionary"`
	StructuredTypes []*structuredType `xml:"StructuredType"`
	EnumeratedTypes []*enumeratedType `xml:"EnumeratedType"`
	OpaqueTypes     []*enumeratedType `xml:"OpaqueType"`
}

type enumeratedType struct {
	Name             string             `xml:",attr"`
	LengthInBits     int                `xml:",attr"`
	Documentation    string             `xml:"Documentation"`
	EnumeratedValues []*enumeratedValue `xml:"EnumeratedValue"`
	Type             string
	ZeroValue        string
}

func (et *enumeratedType) GetType() string {
	switch {
	case et.LengthInBits <= 8:
		return "uint8"
	case et.LengthInBits <= 16:
		return "uint16"
	case et.LengthInBits <= 32:
		return "uint32"
	default:
		return "uint64"
	}
}

type enumeratedValue struct {
	Name  string `xml:",attr"`
	Value int    `xml:",attr"`
}

type structuredType struct {
	Name          string   `xml:",attr"`
	BaseType      string   `xml:",attr"`
	Documentation string   `xml:"Documentation"`
	Fields        []*field `xml:"Field"`
}

func (s *structuredType) IsLengthField(f *field) bool {
	for _, ff := range s.Fields {
		if f.Name == ff.LengthField {
			return true
		}
	}
	return false
}

type field struct {
	Name        string `xml:",attr"`
	TypeName    string `xml:",attr"`
	LengthField string `xml:",attr"`
	SwitchField string `xml:",attr"`
	SwitchValue string `xml:",attr"`
	ZeroValue   string
	EnumType    string
}

func (f *field) GetReplacedTypeName() string {
	return strings.NewReplacer("ua:", "", "tns:", "").Replace(f.TypeName)
}

func (f *field) GetZeroValue() string {
	if f.IsSlice() {
		return "null"
	}

	t := f.GetTypeScriptType()

	// check for enumeration type
	if f.ZeroValue != "" {
		return t + f.ZeroValue
	}

	switch t {
	case "int8", "uint8", "int16", "uint16", "int32", "uint32", "float32", "float64":
		return "0"
	case "int64", "uint64":
		return "BigInt(0)"
	case "string":
		return "''"
	case "ByteString":
		return "new Uint8Array()"
	case "boolean":
		return "false"
	default:
		return fmt.Sprintf("new %s()", t)
	}
}

func (f *field) IsSlice() bool {
	return f.LengthField != ""
}

func (f *field) GetTypeScriptType() string {
	t, ok := builtinTypes[f.TypeName]
	if !ok {
		t = f.GetReplacedTypeName()
	}
	if f.IsSlice() {
		switch t {
		case "uint32":
			t = "Uint32Array"
		case "float64":
			t = "Float64Array"
		default:
			// check for enumeration, e.g. StatusCode[] -> Uint32Array
			switch f.EnumType {
			case "uint32":
				t = "Uint32Array"
			default:
				t += "[]"
			}
		}
		t += " | null"
	}
	return t
}

var decorators = map[string]string{
	"int8":       "int8",
	"uint8":      "uint8",
	"int16":      "int16",
	"uint16":     "uint16",
	"int32":      "int32",
	"uint32":     "uint32",
	"int64":      "int64",
	"uint64":     "uint64",
	"float32":    "float32",
	"float64":    "float64",
	"object":     "object",
	"ByteString": "ByteString",
	"string":     "string",
	"boolean":    "boolean",
	"Date":       "Date",
}

func (f *field) GetDecorator() string {
	t := f.GetTypeScriptType()

	if f.IsSlice() {
		switch t {
		case "Uint32Array | null":
			return "@TypeArray('uint32')"
		case "Float64Array | null":
			return "@TypeArray('float64')"
		default:
			// check for enumeration, e.g. StatusCode[] -> @TypeArray('uint32')
			if f.EnumType != "" {
				return fmt.Sprintf("@TypeArray('%s')", f.EnumType)
			}
			return fmt.Sprintf("@TypeArray('%s')", strings.ReplaceAll(t, "[] | null", ""))
		}
	}

	if dec, ok := decorators[t]; ok {
		return fmt.Sprintf("@Type('%s')", dec)
	}

	if f.EnumType != "" {
		return fmt.Sprintf("@Type('%s')", f.EnumType)
	}

	return "@Type('object')"
}

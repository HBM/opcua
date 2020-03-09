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

// enumeratedTypesZeroValue has the zero value for all enumerated types.
// e.g. NodeIdType -> NodeIdTypeTwoByte
var enumeratedTypesZeroValue = map[string]string{}

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
	// "ua:StatusCode":  "StatusCode",
	"opc:Guid": "Guid",
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

	// decorators
	// if err := tmplDecorators.Execute(&b, decorators); err != nil {
	// 	log.Fatal(err)
	// }

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
				enumeratedTypesZeroValue[t.Name] = v.Name
				break
			}
		}

		// map length in bits to typescript type
		switch {
		case t.LengthInBits <= 8:
			t.Type = "uint8"
		case t.LengthInBits <= 16:
			t.Type = "uint16"
		case t.LengthInBits <= 32:
			t.Type = "uint32"
		default:
			t.Type = "uint64"
		}

		if err := tmplEnum.Execute(&b, t); err != nil {
			log.Fatal(err)
		}
	}

	// structured types
	for _, t := range dict.StructuredTypes {
		// spew.Dump(t)

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

// func Enums(dict *typeDictionary) []Type {
// 	var enums []Type
// 	for _, t := range dict.EnumeratedTypes {
// 		spew.Dump(t)
// 		e := Type{
// 			// Name: goname.Format(t.Name),
// 			Name: t.Name,
// 			Kind: KindEnum,
// 		}

// 		switch {
// 		case t.LengthInBits <= 8:
// 			e.Type = "uint8"
// 		case t.LengthInBits <= 16:
// 			e.Type = "uint16"
// 		case t.LengthInBits <= 32:
// 			e.Type = "uint32"
// 		default:
// 			e.Type = "uint64"
// 		}

// 		for _, val := range t.EnumeratedValues {
// 			v := Value{
// 				// Name:      goname.Format(e.Name + val.Name),
// 				Name:      e.Name + val.Name,
// 				ShortName: val.Name,
// 				Value:     val.Value,
// 			}
// 			e.Values = append(e.Values, v)
// 		}
// 		enums = append(enums, e)
// 	}
// 	return enums
// }

// type Kind int

// const (
// 	KindEnum Kind = iota
// 	KindExtensionObject
// )

// type Value struct {
// 	Name      string
// 	ShortName string
// 	Value     int
// }

// type Field struct {
// 	Name string
// 	Type string
// }

// type Type struct {
// 	// Name is the Go name of the OPC/UA type.
// 	Name string
// 	// Type is the Go type of the OPC/UA type.
// 	Type string
// 	// Kind is the kind of OPC/UA type.
// 	Kind Kind
// 	// Base is the OPC/UA type this type is derived from.
// 	Base *Type
// 	// Fields is the list of struct fields.
// 	Fields []Field
// 	// Values is the list of enum values.
// 	Values []Value
// }

// func writeEnums(enums []Type) {
// 	var b bytes.Buffer
// 	for _, enum := range enums {
// 		// if err := FormatType(w, t); err != nil {
// 		// 	return err
// 		// }
// 		if err := tmplEnum.Execute(&b, enum); err != nil {
// 			log.Fatal(err)
// 		}
// 	}

// 	filename := filepath.Join("..", "..", "src", "ua", "generated.ts")
// 	if err := ioutil.WriteFile(filename, b.Bytes(), 0644); err != nil {
// 		log.Fatalf("Failed to write %s: %v", filename, err)
// 	}

// 	log.Printf("Wrote %s", filename)
// }

var tmplDecorators = template.Must(template.New("").Parse(`
{{ range $key, $value := . }}
export const Type{{ $value }} = (target: object, key: string | symbol): void => {
  Reflect.defineMetadata('design:type', '{{ $key }}', target, key)
}
{{ end }}
`))

var tmplImports = template.Must(template.New("").Parse(`
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
import { StatusOK } from './StatusCode'
`))

var tmplEnum = template.Must(template.New("").Parse(`
type {{ .Name }} = {{ .Type }}
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
}

type enumeratedType struct {
	Name             string             `xml:",attr"`
	LengthInBits     int                `xml:",attr"`
	Documentation    string             `xml:"Documentation"`
	EnumeratedValues []*enumeratedValue `xml:"EnumeratedValue"`
	Type             string
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
	// IsEnum      bool
}

func (f *field) GetZeroValue() string {
	if f.IsSlice() {
		return "null"
	}

	t := f.GetTypeScriptType()

	// check for enumeration type
	if zeroValue, ok := enumeratedTypesZeroValue[t]; ok {
		return t + zeroValue
	}

	switch t {
	case "int8", "uint8", "int16", "uint16", "int32", "uint32", "float32", "float64":
		return "0"
	case "int64", "uint64":
		return "BigInt(0)"
	case "string":
		return `''`
	case "ByteString":
		return "new Uint8Array()"
	case "boolean":
		return "false"
	case "StatusCode":
		return "StatusOK"
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
		prefix := strings.NewReplacer("ua:", "", "tns:", "")
		t = prefix.Replace(f.TypeName)
	}
	if f.IsSlice() {
		switch t {
		case "uint32":
			t = "Uint32Array"
		case "float64":
			t = "Float64Array"
		default:
			t += "[]"
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
			return fmt.Sprintf("@TypeArray('%s')", strings.ReplaceAll(t, "[] | null", ""))
		}
	}

	if dec, ok := decorators[t]; ok {
		// return "@Type" + dec
		return fmt.Sprintf("@Type('%s')", dec)
	}

	switch t {
	// todo: have a look at all enums
	case "StatusCode", "SecurityTokenRequestType", "MessageSecurityMode", "ApplicationType", "UserTokenType":
		// return "@TypeUint32"
		return "@Type('uint32')"
	default:
		return "@Type('object')"
	}
}

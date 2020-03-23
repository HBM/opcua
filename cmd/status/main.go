package main

import (
	"bytes"
	"encoding/csv"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

func main() {
	in := filepath.Join("..", "..", "schema", "StatusCode.csv")
	out := filepath.Join("..", "..", "src", "ua", "StatusCode.ts")

	f, err := os.Open(in)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	rows, err := csv.NewReader(f).ReadAll()
	if err != nil {
		panic(err)
	}

	for i := range rows {
		// make eslint happy
		rows[i][0] = strings.ReplaceAll(rows[i][0], "_", "")
	}

	// prepend fixed values
	rows = append([][]string{
		{"OK", "0x0", ""},
		{"Uncertain", "0x40000000", ""},
		{"Bad", "0x80000000", ""},
	}, rows...)

	var b bytes.Buffer
	if err := tmpl.Execute(&b, rows); err != nil {
		panic(err)
	}

	if err := ioutil.WriteFile(out, b.Bytes(), 0644); err != nil {
		panic(err)
	}
	log.Printf("Wrote %s", out)
}

var tmpl = template.Must(template.New("").Parse(`
import { uint32 } from "../types"

export enum StatusCode {
  {{range .}}{{index . 0}} = <uint32> {{index . 1}},
  {{end}}
}`))

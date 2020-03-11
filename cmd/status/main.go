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
export const StatusCodeOK: StatusCode = 0x0
export const StatusCodeUncertain: StatusCode = 0x40000000
export const StatusCodeBad: StatusCode = 0x80000000

{{range .}}export const StatusCode{{index . 0}}: StatusCode = {{index . 1}}
{{end}}`))

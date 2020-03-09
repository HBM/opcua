#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

curl https://raw.githubusercontent.com/OPCFoundation/UA-Nodeset/master/Schema/NodeIds.csv --output NodeIds.csv
curl https://raw.githubusercontent.com/OPCFoundation/UA-Nodeset/master/Schema/StatusCode.csv --output StatusCode.csv
curl https://raw.githubusercontent.com/OPCFoundation/UA-Nodeset/master/Schema/Opc.Ua.Types.bsd --output Opc.Ua.Types.bsd
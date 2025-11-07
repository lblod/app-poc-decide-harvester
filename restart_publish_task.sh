set -xe
docker compose exec consumer-service curl -X POST \
    http://database:8890/sparql \
    -H "Content-Type: application/sparql-update" \
    -H "mu-auth-sudo: true" \
    --data-binary "PREFIX adms: <http://www.w3.org/ns/adms#>
PREFIX jp: <http://redpencil.data.gift/id/concept/JobStatus/>
DELETE {
  GRAPH ?g {
    <http://redpencil.data.gift/id/task/${1}> adms:status ?oldStatus .
  }
}
INSERT {
  GRAPH ?g {
    <http://redpencil.data.gift/id/task/${1}> adms:status jp:scheduled .
  }
}
WHERE {
  GRAPH ?g {
    OPTIONAL { <http://redpencil.data.gift/id/task/${1}> adms:status ?oldStatus }
  }
}"

import { randomUUID } from 'crypto';
import { writeFileSync, } from 'fs';
const TYPE_INITIAL_SYNC = "http://mu.semte.ch/vocabularies/ext/decide-consumer/initial-sync";
const TYPE_DELTA_FILES = "http://mu.semte.ch/vocabularies/ext/decide-consumer/delta";
const MAKE_TTL_MIGRATION = (consumerType, cronExpr = "*/5 * * * *") => {
    const sjID = randomUUID();
    const csID = randomUUID();
    const stID = randomUUID();
    const dcID = randomUUID();
    const hcID = randomUUID();
    const rfID = randomUUID();
    const date = new Date();
    const ttl = `
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://vocab.deri.ie/cogs#ScheduledJob> .
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://mu.semte.ch/vocabularies/core/uuid> "${sjID}" .
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://purl.org/dc/terms/modified> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://purl.org/dc/terms/creator> <http://lblod.data.gift/services/job-self-service> .
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://purl.org/dc/terms/title> "${consumerType}" .
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://redpencil.data.gift/vocabularies/tasks/operation> <http://lblod.data.gift/id/jobs/concept/JobOperation/deltaProcessing> .
<http://redpencil.data.gift/id/scheduled-job/${sjID}> <http://redpencil.data.gift/vocabularies/tasks/schedule> <http://redpencil.data.gift/id/cron-schedule/${csID}> .
<http://redpencil.data.gift/id/cron-schedule/${csID}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://redpencil.data.gift/vocabularies/tasks/CronSchedule> .
<http://redpencil.data.gift/id/cron-schedule/${csID}> <http://mu.semte.ch/vocabularies/core/uuid> "${csID}" .
<http://redpencil.data.gift/id/cron-schedule/${csID}> <http://schema.org/repeatFrequency> "${cronExpr}" .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://redpencil.data.gift/vocabularies/tasks/ScheduledTask> .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://mu.semte.ch/vocabularies/core/uuid> "${stID}" .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime>.
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://purl.org/dc/terms/modified> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://redpencil.data.gift/vocabularies/tasks/operation> <http://lblod.data.gift/id/jobs/concept/TaskOperation/decide-consumer> .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://redpencil.data.gift/vocabularies/tasks/index> "0"^^<http://www.w3.org/2001/XMLSchema#integer> .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://purl.org/dc/terms/isPartOf> <http://redpencil.data.gift/id/scheduled-job/${sjID}> .
<http://redpencil.data.gift/id/scheduled-task/${stID}> <http://redpencil.data.gift/vocabularies/tasks/inputContainer> <http://redpencil.data.gift/id/data-container/${dcID}> .
<http://redpencil.data.gift/id/data-container/${dcID}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#DataContainer> .
<http://redpencil.data.gift/id/data-container/${dcID}> <http://mu.semte.ch/vocabularies/core/uuid> "${dcID}" .
<http://redpencil.data.gift/id/data-container/${dcID}> <http://redpencil.data.gift/vocabularies/tasks/hasHarvestingCollection> <http://redpencil.data.gift/id/harvesting-container/${hcID}> .
<http://redpencil.data.gift/id/harvesting-container/${hcID}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://lblod.data.gift/vocabularies/harvesting/HarvestingCollection> .
<http://redpencil.data.gift/id/harvesting-container/${hcID}> <http://purl.org/dc/terms/creator> <http://lblod.data.gift/services/job-self-service> .
<http://redpencil.data.gift/id/harvesting-container/${hcID}> <http://mu.semte.ch/vocabularies/core/uuid> "${hcID}" .
<http://redpencil.data.gift/id/harvesting-container/${hcID}> <http://purl.org/dc/terms/hasPart> <http://redpencil.data.gift/id/remote-file/${rfID}> .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#RemoteDataObject> .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://mu.semte.ch/vocabularies/core/uuid> "${rfID}" .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://purl.org/dc/terms/created> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://purl.org/dc/terms/modified> "${date.toISOString()}"^^<http://www.w3.org/2001/XMLSchema#dateTime> .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://purl.org/dc/terms/creator> <http://lblod.data.gift/services/job-self-service> .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://redpencil.data.gift/vocabularies/http/requestHeader> <http://data.lblod.info/request-headers/accept/text/html> .
<http://redpencil.data.gift/id/remote-file/${rfID}> <http://www.semanticdesktop.org/ontologies/2007/01/19/nie#url> <${consumerType}> .
`
    const migrationName = `${process.cwd()}/../config/migrations/local/job-migration-${randomUUID()}`;

    writeFileSync(migrationName + ".graph",
        "http://mu.semte.ch/graphs/harvesting", { encoding: 'utf8' });
    writeFileSync(migrationName + ".ttl",
        ttl, { encoding: 'utf8' });
};


const args = process.argv.slice(2);
let cronExpr = undefined;
let consumerType = undefined;
for (const arg of args) {
    const [argType, value] = arg.split('=');
    switch (argType) {
        case "--cron":

            let v = value.replaceAll('"', '');
            if (v === 'once') { // disable after first
                const date = new Date();
                let minutes = date.getMinutes() + 2;
                cronExpr = `${minutes >= 60 ? '2' : minutes} * * * *`;
            } else {
                cronExpr = v;
            }
            break;
        case "--type": consumerType = value.replaceAll('"', ''); break;
        case "--help":
            console.log(`usage example: node create-job.mjs --cron="* * * * *" --type=${TYPE_DELTA_FILES}|${TYPE_INITIAL_SYNC}`);
            process.exit(0);
        default: console.error(`unknown argument ${argType}`);
    }
}
if (!consumerType) {
    console.log("please provide at least the --type parameter. usage: node create-job.mjs --help");
    process.exit(-1);
}

MAKE_TTL_MIGRATION(consumerType, cronExpr);
console.log("done. restart migration service");

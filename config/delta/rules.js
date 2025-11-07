export default [
    {
        match: {
            subject: {},
        },
        callback: {
            url: "http://resource/.mu/delta",
            method: "POST",
        },
        options: {
            resourceFormat: "v0.0.1",
            gracePeriod: 1000,
            foldEffectiveChanges: true,
            ignoreFromSelf: true,
        },
    },
    {
        match: {
            predicate: {
                type: 'uri',
                value: 'http://www.w3.org/ns/adms#status'
            }
        },
        callback: {
            method: 'POST',
            url: 'http://jobs-controller/delta'
        },
        options: {
            resourceFormat: 'v0.0.1',
            gracePeriod: 1000,
            ignoreFromSelf: true
        }
    },
    {
        match: {
            predicate: {
                type: "uri",
                value: "http://www.w3.org/ns/adms#status",
            },
            object: {
                type: "uri",
                value: "http://redpencil.data.gift/id/concept/JobStatus/scheduled",
            },
        },
        callback: {
            method: "POST",
            url: "http://publish-service/delta",
        },
        options: {
            resourceFormat: "v0.0.1",
            gracePeriod: 1000,
            ignoreFromSelf: true,
            foldEffectiveChanges: true
        },
    },
    {
        match: {
            predicate: {
                type: "uri",
                value: "http://www.w3.org/ns/adms#status",
            },
            object: {
                type: "uri",
                value: "http://redpencil.data.gift/id/concept/JobStatus/scheduled",
            },
        },
        callback: {
            method: "POST",
            url: "http://consumer-service/delta",
        },
        options: {
            resourceFormat: "v0.0.1",
            gracePeriod: 1000,
            ignoreFromSelf: true,
            foldEffectiveChanges: true
        },
    },
    {
        match: {
            predicate: {
                type: "uri",
                value: "http://www.w3.org/ns/adms#status",
            },
            object: {
                type: "uri",
                value: "http://redpencil.data.gift/id/concept/JobStatus/scheduled",
            },
        },
        callback: {
            method: "POST",
            url: "http://filter-service/delta",
        },
        options: {
            resourceFormat: "v0.0.1",
            gracePeriod: 1000,
            ignoreFromSelf: true,
            foldEffectiveChanges: true
        },
    },
];

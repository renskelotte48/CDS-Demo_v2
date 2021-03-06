
function getCard(last_measurement, patientId) {
    return {
        summary: `Last measurement for patient ${patientId}`,
        detail: `This patient's last measurement was on ${last_measurement.substring(0, 10)}`,
        indicator: 'info',
        source: {
            label: "Patient last measurement",
        }
    }
}

function payload(data) {
    const PARSED_DATA = JSON.parse(data).context;
    if (PARSED_DATA.last_measurement != -1) {
        return { cards: [getCard(PARSED_DATA.last_measurement.obs_datetime, PARSED_DATA.patientId), PARSED_DATA] };
    } else return { cards: [] };
}

module.exports = {
    definition: {
        id: 'lastmeasurement',
        name: 'Last measurement overview',
        hook: 'measurement-view',
        description: 'Gives the last measurement of a patient',
        prefetch: {
            last_measurement: 'measurements/{{patient_id}}',
            patientId: 'measurements/{{patient_id}}'
        }
    },
    fixedPayload: {
        cards: [{
            summary: 'Gives last measurement of a patient',
            indicator: 'info'
        }]
    },
    payload
}
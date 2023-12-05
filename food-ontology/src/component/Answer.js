import * as React from 'react';
import * as sparql from 'sparqljs';

function askOntology() {
    let sparqlEndpoint = 'http://dbpedia.org/sparql';

    let query = `select distinct ?Concept where {[] a ?Concept} LIMIT 100`;

    let encodedQuery = encodeURIComponent(query);
    let sparqlUrl = `${sparqlEndpoint}?query=${encodedQuery}&format=json`

    console.log("Fetch query");
    fetch(sparqlUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Got results! Processing started...")
            // Process the results here
            processResults(data);
            // console.log(data);
            console.log("Processing finished!");
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Process the query results
function processResults(data) {
    // Extracting bindings from the JSON response
    const bindings = data.results.bindings;

    // Processing each result
    bindings.forEach(result => {
        // Extracting informations from the binding
        let conceptType = result.Concept.type;
        let conceptValue = result.Concept.value;

        // Outputting the retrieved information
        console.log(`the concept ${conceptValue} is of type ${conceptType}`);
    });
}

function Answer(props) {
    return (
        <div>
            Yo hello there
            {props.blabla}
            <br/>
            I am bad at react, to see the result of this button, open the
            web dev console
            <br/>
            <button onClick={askOntology}> ask ontology</button>
        </div>
    )
}

export default Answer;

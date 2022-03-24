describe('First static FAIR draft test', () => {

    it('PUB record check exists', () => {
        cy.visit('https://pub.uni-bielefeld.de/record/2960290')
      })

/*    it('PANGAEA record check exists', () => {
        cy.visit('https://doi.pangaea.de/10.1594/PANGAEA.932827')
    })
*/
    it('PANGAEA record with check Link', () => {
        cy.request('https://doi.pangaea.de/10.1594/PANGAEA.932827')
        .then((response) => {

            const contenttype = response.headers['content-type']
            const link = response.headers['link']
            
            expect(link).to.contain('rel="describedby"')
            expect(link).to.contain('rel="author"')
            expect(link).to.contain('rel="cite-as"')
        })
    })

    it('PUB record with check Link', () => {
        cy.request('https://pub.uni-bielefeld.de/record/2960290')
        .then((response) => {

            const contenttype = response.headers['content-type']
            const link = response.headers['link']
            
            expect(contenttype).to.equal('text/html; charset=utf-8')
            expect(link).to.equal('<https://orcid.org/0000-0002-0458-1004>; rel="author", <https://orcid.org/0000-0003-3883-4169>; rel="author", <https://doi.org/10.5281/zenodo.5801283>; rel="describedby"; type="application/vnd.citationstyles.csl+json", <https://doi.org/10.5281/zenodo.5801283>; rel="identifier", <http://schema.org/ScholarlyArticle>; rel="type"')
            expect(link).to.contain('rel="describedby"')
            expect(link).to.contain('rel="author"')
//            expect(link).to.contain('rel="cite-as"')

            const myLinks = link.split(",");
            myLinks.forEach(fairlink => {

                const linkproperties = fairlink.split(";");
                linkproperties.forEach(evalLink => {

                    const relationString = "rel=";
                    const typeString = "type=";
                    const findRelation=evalLink.toLowerCase().substring(1,5);
                    cy.log(findRelation)
                    if(findRelation === relationString) {
                        const myRelation = evalLink.toLowerCase().substring(5);
                        cy.log(myRelation)

                    } else if(evalLink.toLowerCase().substring(1,6) === typeString) {
                        const myType = evalLink.toLowerCase().substring(6);
                        cy.log(myType)

                    }

                })
                cy.log("==")

            })

        })
    })
})

// testData.json with record-URLs
const testData = require("../fixtures/records.json");
describe("Dynamically Generated FAIR Tests", () => {

    testData.forEach(testDataRow => {
        const data = {
            record: testDataRow.record
        };
        context(`Generating a FAIR eval test for ${data.record}`, () => {
            it("describedby, author, cite-as details", () => {

                cy.request(data.record)
                    .then((response) => {

                        const link = response.headers['link']
            
                        expect(link).to.contain('rel="describedby"')
                        expect(link).to.contain('rel="author"')
//                        expect(link).to.contain('rel="cite-as"')


                        const myLinks = link.split(",");
                        myLinks.forEach(fairlink => {
            
                            cy.log(fairlink.replace(/\s/g, ""))
                            const linkproperties = fairlink.replace(/\s/g, "").split(";");
                            cy.log(linkproperties.length)

                            linkproperties.forEach(evalLink => {
            
                                const relationString = "rel=";
                                const typeString = "type=";
                                const findRelation=evalLink.toLowerCase().substring(0,4);
//                                cy.log(findRelation)

// find relations
                                if(evalLink.toLowerCase().substring(0,4) === relationString) {
                                    const myRelation = evalLink.toLowerCase().substring(4);

                                    cy.log(myRelation)
                                    if( myRelation === "\"author\"") {
                                        linkproperties.forEach(checkURL => {
                                            if(checkURL.toLowerCase().substring(0,5) === "<http") {
                                                cy.log(checkURL)
                                                checkURL = checkURL.replace(/</g, "").replace(/>/g, "")
                                                cy.request({
                                                    url: checkURL,
                                                    //followRedirect: false, // turn off following redirects
                                                }).then((resp) => {
                                                    // redirect status code is 302
                                                    expect(resp.status).to.eq(200)
                                                })
                                            }
                                        })
                                    }
// find describedby
                                    else if(myRelation === "\"describedby\"") {
                                        linkproperties.forEach(checkURL => {
                                            if(checkURL.toLowerCase().substring(0,5) === "<http") {
                                                cy.log(checkURL)
                                                checkURL = checkURL.replace(/</g, "").replace(/>/g, "")
                                                cy.request({
                                                    url: checkURL,
                                                    //followRedirect: false, // turn off following redirects
                                                }).then((resp) => {
                                                    // redirect status code is 302
                                                    expect(resp.status).to.eq(200)
                                                })
                                            }
                                        })
                                    }
            
                                } else if(evalLink.toLowerCase().substring(0,5) === typeString) {
                                    const myType = evalLink.toLowerCase().substring(5);
                                    cy.log(myType)
            
                                }
            
                            })
                            cy.log("==")
            
                        })


                    })
            });
        });
    });
});
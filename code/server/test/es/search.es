// NB of people by year
POST /messages/_search
{
    "size": 0,
    "aggs": {
        "year": {
            "terms": {
                "field": "year",
                "size": 60
            },
            "aggs": {
                "nbPeople": {
                    "cardinality": {
                        "field": "people"
                    }
                }
            }
        }
    }
}

// Search for people in year range sorted by company number
POST /people/_search
{
    "size": 10,
    "_source": [
        "name", "years"
    ],
    "query": {
        "bool": {
            "filter": [
                {
                    "range": {
                        "years": {
                            "gte": 2000,
                            "lte": 2010
                        }
                    }
                }
            ]
        }
    },
    "sort": {
        "_script": {
            "type": "number",
            "script": {
                "lang": "painless",
                "source": "doc['companies.id'].length"
            },
            "order": "desc"
        }
    }
}

// facet of top 10 companies in people search page with a filter on years
POST /people/_search
{
    "size": 0,
    "_source": false,
    "query": {
        "bool": {
            "filter": [
                {
                    "range": {
                        "years": {
                            "gte": 2000,
                            "lte": 2010
                        }
                    }
                }
            ]
        }
    },
    "aggs": {
        "companies": {
            "terms": {
                "field": "companies"
            }
        }
    }
}


POST /messages/_search
{
    "size": 0,
    "_source": false,
   
    "aggs": {
        "companies": {
            "terms": {
                "field": "companies"
            }
        },
        "people": {
            "terms": {
                "field": "people"
            }
        }
    }
}


// example of clustering people
POST /people/_search
{
    "size": 0,
    "_source": false,
    "aggs": {
        "fingerprint": {
            "terms": {
                "field": "fingerprint"
            },
            "aggs": {
                "people": {
                    "terms": {
                        "field": "name"
                    }
                }
            }
        }
    }
}
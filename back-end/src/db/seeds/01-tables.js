exports.seed = function(knex) {
    console.log("------- Running tables seed -------");

    return knex("tables").del().insert([{
            "table_name": "Bar #1",
            "capacity": 1,
        },
        {
            "table_name": "Bar #2",
            "capacity": 1,
        },
        {
            "table_name": "#1",
            "capacity": 6,
        },
        {
            "table_name": "#2",
            "capacity": 6,
        },
    ]);
};
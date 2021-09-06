const mysql = require('mysql2/promise');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'mushroom',
    });

    let sql = '';
    let rows = [];

    // LOGIC BELOW

    function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1)
    }

    // ** 1. ** _Isspausdinti, visu grybu pavadinimus ir ju kainas, grybus isrikiuojant nuo brangiausio link pigiausio_

    sql = 'SELECT `mushroom`, `price`\
            FROM`mushroom` \
            ORDER BY `price` DESC;';
    [rows] = await connection.execute(sql);

    // const mushroomList = rows.map(obj => obj.mushroom);
    // const mushroomPriceList = rows.map(obj => obj.price);

    let count = 0;
    let allMushrooms = [];
    for (const { mushroom, price } of rows) {
        allMushrooms.push(`${++count}. ${capitalize(mushroom)} - ${price} EUR/kg`)
    }
    console.log(allMushrooms.join('\n'));

    //** 2. ** _Isspausdinti, visu grybautoju vardus_

    sql = 'SELECT `name` \
            FROM `gatherer`';

    [rows] = await connection.execute(sql);
    const gatherers = rows.map(obj => obj.name);

    console.log('**************************************');
    console.log(`Grybautojai: ${gatherers.join(', ')}.`);

    // ** 3. ** _Isspausdinti, brangiausio grybo pavadinima_

    sql = 'SELECT `mushroom` as name, `price`\
    FROM`mushroom` \
    ORDER BY `price` DESC;';

    //arba:
    //sql = 'SELECT MAX(price) AS LargestPrice, `mushroom` FROM `mushroom`'; pigesnis budas uzklausai del vieno vienintelio is DB objekto.

    [rows] = await connection.execute(sql);

    console.log('********************************');
    console.log(`Brangiausias grybas yra: ${capitalize(rows[0].name)}.`);

    //**4.** _Isspausdinti, pigiausio grybo pavadinima_
    const last = rows.length - 1;
    console.log('********************************');
    console.log(`Pigiausais grybas yra: ${rows[last].name}.`);


    //**5.** _Isspausdinti, visu kiek vidutiniskai reikia grybu, jog jie svertu 1 kilograma (suapvalinti iki vieno skaiciaus po kablelio), isrikiuojant pagal pavadinima nuo abeceles pradzios link pabaigos_ *******dalinsim is 1000g kad gauti kieki
    sql = 'SELECT `mushroom`, (1000/`weight`) as kiekis\
            FROM`mushroom` \
            ORDER BY `mushroom` ASC;';

    [rows] = await connection.execute(sql);

    count = 0;
    allMushrooms = [];
    for (const { mushroom, kiekis } of rows) {
        allMushrooms.push(`${++count}) ${capitalize(mushroom)} - ${(+kiekis).toFixed(1)}`)
    }
    console.log('*****************************');
    console.log('Grybai:');
    console.log(allMushrooms.join('\n'));

    //**6.** _Isspausdinti, visu grybautoju krepselyje esanciu grybu kiekius (issirikiuojant pagal grybautojo varda nuo abeceles pradzios link pabaigos)_
    sql = 'SELECT `gatherer`.`name`, `gatherer`.`id`\
            FROM`gatherer` \
            ORDER BY `id` ASC;';

    const sql2 = 'SELECT `basket`.`gatherer_id` as grybautojas, `count`\
            FROM`basket`\
            ORDER BY `gatherer_id` ASC;';

    [rows] = await connection.execute(sql);

    let grybautojai = [];

    for (const { name } of rows) {
        grybautojai.push(name)
    }

    [rows] = await connection.execute(sql2);
    let infoList = []

    for (i = 0; i < grybautojai.length; i++) {
        const person = grybautojai[i];
        let grybaiCount = 0;

        for (const { grybautojas, count } of rows) {
            if (grybautojas === i + 1) {
                grybaiCount = grybaiCount + count;
            }
        }
        infoList.push({ person, grybaiCount })
    }

    let rowCount = 0;
    console.log(`**************************************`);
    console.log(`Grybu kiekis pas grybautoja:`);
    for (const { person, grybaiCount } of infoList) {
        console.log(`${++rowCount}) ${person} - ${grybaiCount} grybu`);
    }

}

app.init();

module.exports = app;
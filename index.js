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

    console.log('');
    console.log(`Grybautojai: ${gatherers.join(', ')}.`);

    // ** 3. ** _Isspausdinti, brangiausio grybo pavadinima_

    sql = 'SELECT `mushroom` as name, `price`\
    FROM`mushroom` \
    ORDER BY `price` DESC;';

    //arba:
    //sql = 'SELECT MAX(price) AS LargestPrice, `mushroom` FROM `mushroom`'; pigesnis budas uzklausai del vieno vienintelio is DB objekto.

    [rows] = await connection.execute(sql);

    console.log('');
    console.log(`Brangiausias grybas yra: ${capitalize(rows[0].name)}.`);

    //**4.** _Isspausdinti, pigiausio grybo pavadinima_
    const last = rows.length - 1;
    console.log('');
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
    console.log('');
    console.log('Grybai:');
    console.log(allMushrooms.join('\n'));

    //**6.** _Isspausdinti, visu grybautoju krepselyje esanciu grybu kiekius (issirikiuojant pagal grybautojo varda nuo abeceles pradzios link pabaigos)_
    sql = 'SELECT `gatherer`.`name`, `gatherer`.`id`\
            FROM`gatherer` \
            ORDER BY `id` ASC;';

    let sql2 = 'SELECT `basket`.`gatherer_id` as grybautojas, `count`\
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
    console.log(``);
    console.log(`Grybu kiekis pas grybautoja:`);
    for (const { person, grybaiCount } of infoList) {
        console.log(`${++rowCount}) ${person} - ${grybaiCount} grybu`);
    }

    //**7.** _Isspausdinti, visu grybautoju krepseliu kainas (issirikiuojant nuo brangiausio link pigiausio krepselio), suapvalinant iki centu_

    sql = 'SELECT `gatherer`.`name`, SUM(`count`*`price`*`weight`/1000)as amount\
            FROM `basket`\
            LEFT JOIN `gatherer`\
                ON `gatherer`.`id`=`basket`.`gatherer_id`\
            LEFT JOIN `mushroom`\
                ON `mushroom`.`id`= `basket`.`mushroom_id`\
            GROUP BY `basket`.`gatherer_id`\
            ORDER BY `amount` DESC';

    [rows] = await connection.execute(sql);

    rowCount = 0;

    console.log('');
    console.log(`Grybautojo krepselio kaina:`);
    for (const { name, amount } of rows) {
        console.log(`${++rowCount}) ${capitalize(name)} - ${(+amount).toFixed(2)} EUR`);
    }

    //**8** _Isspausdinti, kiek nuo geriausiai vertinamu iki blogiausiai vertinamu grybu yra surinkta. Spausdinimas turi atlikti funkcija (pavadinimu `mushroomsByRating()`), kuri gauna vieninteli parametra - kalbos pavadinima, pagal kuria reikia sugeneruoti rezultata_
    console.log('');

    async function mushroomByRating(lang) {

        const langList = ['en', 'lt', 'esp', 'lv'];

        lang = langList.includes(lang) ? lang : langList[0];

        sql = 'SELECT `ratings`.`id`, `name_' + lang + '`, SUM(`count`) as amount\
        FROM `ratings`\
        LEFT JOIN `mushroom`\
            ON `mushroom`.`rating`=`ratings`.`id`\
        LEFT JOIN `basket`\
            ON `basket`.`mushroom_id` =`mushroom`.`id`\
        GROUP BY `ratings`.`id`\
        ORDER BY `ratings`.`id` DESC';

        [rows] = await connection.execute(sql);

        if (lang === 'lt') {

            console.log(`Grybu kiekis pagal ivertinima:`);
            for (let { id, name_lt, amount } of rows) {
                if (amount == null) {
                    amount = 0;
                }
                console.log(`${id} zvaigzdutes (${name_lt}) - ${amount} grybai`);
            }
        } else {
            console.log('');
            console.log(`Mushrooms count by rating:`);
            for (let { id, name_en, amount } of rows) {
                if (amount == null) {
                    amount = 0;
                }
                console.log(`${id} stars (${name_en}) - ${amount} grybai`);
            }
        }
    }
    await mushroomByRating('lt');
    console.log(``);
    await mushroomByRating('en');

    //**9** _Isspausdinti, visus grybus, kuriu ivertinimas geresnis arba lygus 4 zvaigzdutem, isrikiuotus gerejimo tvarka_

    sql = 'SELECT `mushroom` as name, `rating`\
    FROM `mushroom`\
    WHERE `rating` >= 4\
    ORDER BY `rating` ASC' ;

    [rows] = await connection.execute(sql);

    let mushroomList = [];

    for (let { name, rating } of rows) {
        mushroomList.push(capitalize(name))
    }
    console.log('');
    console.log(`Grybai: ${mushroomList.join(', ')}.`);

    //**10** _Isspausdinti, visus grybus, kuriu ivertinimas yra viena is nurodytu reiksmiu: 1, 3 arba 5 zvaigzdutem, isrikiuotus gerejimo tvarka_

    sql = 'SELECT `mushroom` as name, `rating`\
    FROM `mushroom`\
    WHERE rating IN (1,3,5) \
    ORDER BY `rating` ASC' ;

    [rows] = await connection.execute(sql);
    console.log(rows);
    mushroomList = [];

    for (let { name, rating } of rows) {
        mushroomList.push(capitalize(name))
    }
    console.log('');
    console.log(`Grybai: ${mushroomList.join(', ')}.`);
}

app.init();

module.exports = app;
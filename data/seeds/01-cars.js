exports.seed = function(knex) {
    return knex('cars').truncate()
        .then(function(){
            return knex('cars').insert([
                {vin: '1111234', make: 'Honda', model: 'Crosstour', mileage: 80000, title: 'owned', transmission: 'clean'},
                {vin: '123451234', make: 'Mercury', model: 'Sienna', mileage: 800, title: 'owned', transmission: 'old'},
                {vin: '1098234', make: 'Tesla', model: 'Model S', mileage: 42400, title: 'leased', transmission: 'clean'},
                {vin: '034234234', make: 'Jeep', model: 'Wrangler', mileage: 2000, title: 'leased', transmission: 'clean'},
            ]);
        });
};

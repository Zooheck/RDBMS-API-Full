
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'David Flack', cohort_id: 1},
        {name: 'CJ Tantay', cohort_id: 2},
        {name: 'Brandon Lent', cohort_id: 1}
      ]);
    });
};

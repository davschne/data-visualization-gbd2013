export default function(data, locations) {

  return {
    hasLocation(id) {
      return !!locations[id];
    },
    getLocationData(id) {
      return locations[id];
    },
    getDatum(location, age_group, sex, year, metric) {
      // retrieve data point and convert to percentage
      return data[location][age_group][sex][year][metric];
    },
    getMean({
      loc_id: loc_id,
      age_group: age_group,
      sex: sex,
      start_year: start_year,
      end_year: end_year
    }) {
      if (end_year < start_year) throw Error("end year must be greater than start year");

      let overweight = [];
      let obese      = [];

      for (let year = start_year; year <= end_year; year++) {
        overweight.push(this.getDatum(loc_id, age_group, sex, year, "overweight"));
        obese.push(this.getDatum(loc_id, age_group, sex, year, "obese"));
      }

      function sum(acc, curr) {
        return acc + curr;
      }

      return {
        overweight : overweight.reduce(sum, 0) / overweight.length,
        obese      : obese.reduce(sum, 0) / obese.length
      };
    }
  };
};

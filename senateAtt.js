let members = data.results[0].members;

console.log(members);

let statistics = {
	dem_reps: 0,
	dem_voted_total: 0,
	rep_reps: 0,
	rep_voted_total: 0,
	ind_reps: 0,
	ind_voted_total: 0,
	total_reps_total: 0,
	total_voted_total: 0
};
for (let i = 0; i < members.length; i++) {
	if (members[i]['party'] === 'D') {
		statistics.dem_reps += 1;
		statistics.dem_voted_total += members[i]['votes_with_party_pct'];
	}
	if (members[i]['party'] === 'R') {
		statistics.rep_reps += 1;
		statistics.rep_voted_total += members[i]['votes_with_party_pct'];
		console.log(members[i]);
	}
	if (members[i]['party'] === 'I') {
		statistics.ind_reps += 1;
		statistics.ind_voted_total += members[i]['votes_with_party_pct'];
		console.log(members[i]);
	}
}
statistics.total_reps_total = members.length;
statistics.total_voted_total =
	(statistics.dem_voted_total + statistics.ind_voted_total + statistics.rep_voted_total) / members.length;

//CREATE TABLE
let myTable = document.getElementById('table-body');

let dir = [ 'Democrats', 'Republicans', 'Independents', 'Total' ];
console.log(statistics);
for (let i = 0; i < dir.length; i++) {
	let tr = document.createElement('tr');
	let tdName = document.createElement('td');
	let tdRep = document.createElement('td');
	let tdVote = document.createElement('td');
	if (i === 0) {
		tdName.textContent = dir[i];
		tdRep.textContent = statistics.dem_reps;
		tdVote.textContent = (statistics.dem_voted_total / statistics.dem_reps).toFixed(2) + '%';
		tr.append(tdName, tdRep, tdVote);
	} else if (i === 1) {
		tdName.textContent = dir[i];
		tdRep.textContent = statistics.rep_reps;
		tdVote.textContent = (statistics.rep_voted_total / statistics.rep_reps).toFixed(2) + '%';
		tr.append(tdName, tdRep, tdVote);
	} else if (i === 2) {
		tdName.textContent = dir[i];
		tdRep.textContent = statistics.ind_reps;
		if (statistics.ind_reps === 0) {
			tdVote.textContent = '0';
		} else {
			tdVote.textContent = (statistics.ind_voted_total / statistics.ind_reps).toFixed(2) + ' % ';
		}
		tr.append(tdName, tdRep, tdVote);
	} else {
		tdName.textContent = dir[i];
		var total = statistics.dem_reps + statistics.rep_reps + statistics.ind_reps;
		var prcTotal = statistics.rep_voted_total + statistics.dem_voted_total + statistics.ind_voted_total;
		tdRep.textContent = total;
		tdVote.textContent = (prcTotal / total).toFixed(2) + ' % ';
		tr.append(tdName, tdRep, tdVote);
	}
	myTable.append(tr);
}

function compare(a, b) {
	let missed_votesA = a.missed_votes_pct;
	let missed_votesB = b.missed_votes_pct;

	let comparison = 0;
	if (missed_votesA > missed_votesB) {
		comparison = 1;
	} else if (missed_votesA < missed_votesB) {
		comparison = -1;
	}

	return comparison;
}

let sorted = members.sort(compare);

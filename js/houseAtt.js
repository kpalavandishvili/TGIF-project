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
//sortedRevese = sortedRevese.reverse();

console.log(sorted);
genderMostEngaged(sorted);
genderLeastEngaged(sorted);

function genderMostEngaged(members) {
	let myTable1 = document.getElementById('mostEngagedData'); //CREATE SECOND TABLE

	var tenpct = Math.round(members.length * 0.1) + 2;
	console.log(' the size is :' + tenpct);
	var tenpctarr = [];
	for (let i = 0; i < tenpct; i++) {
		tenpctarr.push(members[i]);
	}
	console.log(tenpctarr);
	for (let i = 0; i < tenpctarr.length; i++) {
		let tr = document.createElement('tr');

		let tdName1 = document.createElement('td');
		let tdNum = document.createElement('td');
		let tdMiss = document.createElement('td');

		let linkNames = document.createElement('a'); //LINK-NAMES

		let middle_name;
		if (tenpctarr[i].middle_name == null) {
			//REMOVE null from array
			middle_name = '';
		} else {
			middle_name = tenpctarr[i].middle_name;
		}

		linkNames.setAttribute('href', tenpctarr[i].url);
		linkNames.setAttribute('target', 'blank');
		linkNames.textContent = tenpctarr[i].first_name + ' ' + tenpctarr[i].last_name + ' ' + middle_name;

		tdName1.append(linkNames);

		tdNum.textContent = tenpctarr[i].missed_votes;
		tdMiss.textContent = tenpctarr[i].missed_votes_pct;
		tr.append(tdName1, tdNum, tdMiss);
		myTable1.append(tr);
	}
}
function genderLeastEngaged(members) {
	let myTable2 = document.getElementById('leastEngagedData'); //CREATE third TABLE
	var tenpct1 = Math.round(members.length * 0.1) + 2;
	console.log('>>>>> --> ' + tenpct1);
	var tenpctarr1 = [];
	members.reverse(); //გადამატანინა მენტორმა, დუბლიკატებია გასასწორებელი ამ ცხრილში
	for (let i = 0; i < tenpct1; i++) {
		tenpctarr1.push(members[i]);
	}
	console.log(' length is : ' + tenpctarr1.length);

	for (let i = 0; i < tenpctarr1.length; i++) {
		let tr1 = document.createElement('tr');
		let tdName2 = document.createElement('td');
		let tdNum1 = document.createElement('td');
		let tdMiss1 = document.createElement('td');

		let linkNames1 = document.createElement('a');
		let middle_name;
		if (tenpctarr1[i].middle_name == null) {
			//REMOVE null from array
			middle_name = '';
		} else {
			middle_name = tenpctarr1[i].middle_name;
		}
		linkNames1.setAttribute('href', tenpctarr1[i].url);
		linkNames1.setAttribute('target', 'blank');
		linkNames1.textContent = tenpctarr1[i].first_name + ' ' + tenpctarr1[i].last_name + ' ' + middle_name;

		tdName2.append(linkNames1);
		tdNum1.textContent = tenpctarr1[i].missed_votes;
		tdMiss1.textContent = tenpctarr1[i].missed_votes_pct;
		tr1.append(tdName2, tdNum1, tdMiss1);
		myTable2.append(tr1);
	}
}
test();
function test() {
	var arr = [ 1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 7, 8, 9, 10, 43, 43, 54, 55, 55, 55 ];

	var tenPercent = Math.round(arr.length * 0.1); //calculating length of 10%
	console.log('tenPercent :' + tenPercent); //printing the length
	var tenpctarr = []; // creating new array

	var curr = -1; //creating temporary variable
	for (let i = 0; i < arr.length; i++) {
		curr = arr[i];
		if (i < tenPercent) {
			// if index is within  our tenPercent length
			console.log('add: ' + curr);
			tenpctarr.push(curr); // adding item to our new array
		} else if (tenpctarr[tenpctarr.length - 1] == curr) {
			// if current item in arr equals to last item in the arr pushing that also
			tenpctarr.push(curr);
		} else {
			// all other cases, we break
			break;
		}
	}
	// valiadting the result via console log.
	console.log('curr length is :' + tenpctarr);
}

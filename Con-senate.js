let members = data.results[0].members; //array all Json info and [0] index means START of ARRAY

console.log(members); // CHTOBI VIDET V CONSOLE

function table() {
	let table = document.getElementById('table-body');

	for (let i = 0; i < members.length; i++) {
		let tr = document.createElement('tr');
		let tdFullName = document.createElement('td');
		let tdParty = document.createElement('td');
		let tdState = document.createElement('td');
		let tdYearsInOffice = document.createElement('td');
		let tdPercentageOfVotes = document.createElement('td');

		let middle_name;
		if (members[i].middle_name == null) {
			middle_name = '';
		} else {
			middle_name = members[i].middle_name;
		}

		let linkNames = document.createElement('a');
		linkNames.setAttribute('href', members[i].url);
		linkNames.setAttribute('target', 'blank');
		linkNames.textContent = members[i].first_name + ' ' + members[i].last_name + ' ' + middle_name;
		tdFullName.append(linkNames);
		tr.append(tdFullName);
		// table.append(tr);

		tdParty.innerHTML = members[i].party;
		tr.append(tdParty);
		table.append(tr);

		tdState.innerHTML = members[i].state;
		tr.append(tdState);

		tdYearsInOffice.innerHTML = members[i].seniority;
		tr.append(tdYearsInOffice);

		tdPercentageOfVotes.innerHTML = members[i].votes_with_party_pct + '%';
		tr.append(tdPercentageOfVotes);
	}
}
table();

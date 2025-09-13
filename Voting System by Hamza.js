// Display results (show all candidates and votes)
function displayData() {
    const container = document.getElementById('dataTable');
    container.innerHTML = '';
    const data = JSON.parse(localStorage.getItem('votesData')) || [];

    for (const year in candidatesByYear) {
        if (!candidatesByYear[year].length) continue;

        // collect votes for candidates of this year
        const yearCandidates = candidatesByYear[year].map(cand => {
            const record = data.find(v => v.candidate === cand && v.year === year);
            return { candidate: cand, count: record ? record.count : 0 };
        });

        // sort descending by votes
        yearCandidates.sort((a, b) => b.count - a.count);

        // build table
        const table = document.createElement('table');
        let html = `<tr class="class-header"><th>${year}</th><th>Candidate</th><th>Votes</th></tr>`;
        
        let yearTotal = 0;
        yearCandidates.forEach(c => {
            yearTotal += c.count;
            html += `<tr><td>${year}</td><td>${c.candidate}</td><td>${c.count}</td></tr>`;
        });

        // total row
        html += `<tr style="font-weight:bold; background:#f0f0f0;">
                   <td colspan="2">Total Votes for ${year}</td>
                   <td>${yearTotal}</td>
                 </tr>`;

        table.innerHTML = html;
        container.appendChild(table);
    }
}

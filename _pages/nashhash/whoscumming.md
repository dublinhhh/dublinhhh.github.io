---
permalink: "/nashhash/whoscumming"
title: Irish Nash Hash - Who's Cumming?
layout: nashhash
last_modified_at: '2025-09-23'
---

### Confirmed Registrations

<div id="loading">Loading registration data...</div>
<div id="registration-table" style="display:none;"></div>
<div id="error" style="display:none; color:red;"></div>

<script>
// Replace SHEET_ID with your public Google Sheet ID
// Get this from your Google Sheets URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
const SHEET_ID = 
'12fO-bjCD2wLRK3NdYq0C8046cM2UQ2yeR1XlsZJt5wo';
// CSV export gets all data, no range needed

async function loadRegistrations() {
    const loadingEl = document.getElementById('loading');
    const tableEl = document.getElementById('registration-table');
    const errorEl = document.getElementById('error');

    try {
        const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`);

        if (!response.ok) {
            throw new Error('Failed to load data');
        }

        const csvText = await response.text();
        const rows = csvText.split('\n').map(row => row.split(',').map(cell => cell.replace(/"/g, '')));

        if (!rows || rows.length === 0) {
            throw new Error('No confirmed registrations found');
        }

        // Build HTML table
        let html = '<table style="width:100%; border-collapse: collapse;">';

        // Use custom headers
        html += '<thead><tr style="background-color: #f0f0f0;">';
        html += '<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>';
        html += '<th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Hash</th>';
        html += '</tr></thead><tbody>';

        // Data rows - skip header row (start from index 1)
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length > 0 && row[0]) { // Skip empty rows
                html += '<tr>';
                row.forEach((cell, index) => {
                    let cellStyle = 'border: 1px solid #ddd; padding: 8px;';
                    // First column (name) - make it bold
                    if (index === 0) {
                        cellStyle += ' font-weight: bold;';
                    }
                    html += `<td style="${cellStyle}">${cell || ''}</td>`;
                });
                html += '</tr>';
            }
        }
        html += '</tbody></table>';

        // Add count (subtract 1 for header row)
        const confirmedCount = rows.length - 1;
        html = `<p><strong>${confirmedCount} confirmed registration${confirmedCount !== 1 ? 's' : ''}</strong></p>` + html;

        // Show results
        loadingEl.style.display = 'none';
        tableEl.innerHTML = html;
        tableEl.style.display = 'block';

    } catch (error) {
        console.error('Error loading registrations:', error);
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Unable to load registration data. Please try again later.';
        errorEl.style.display = 'block';
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadRegistrations);
</script>

import React from "react"
import styled from "styled-components"
const CalendarEl = styled.div`
	width: 100%;
	table {
		border-collapse: collapse;
		margin: 25px 0;
		font-size: 0.9em;
		font-family: sans-serif;
		min-width: 400px;
		width: 100%;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
		background: white;
		font-size: 1.2rem;
		thead {
			tr {
				background-color: #009879;
				color: #ffffff;
				th {
					text-align: left;
					padding: 12px 15px;
				}
			}
		}
		tbody {
			tr:nth-of-type(even) {
				background-color: #f3f3f3;
			}
			td {
				padding: 12px 15px;
			}
		}
	}
`
export default function Calendar({ calendar }) {
	return (
		<CalendarEl>
			<h1>Календарь событий</h1>
			<table>
				<thead>
					<tr>
						<th>Дата</th>
						<th>Время</th>
						<th>Тип</th>
					</tr>
				</thead>
				<tbody>
					{calendar.map(calendar => (
						<tr key={calendar.id}>
							<td>{calendar.date}</td>
							<td>{calendar.time}</td>
							<td>{calendar.type}</td>
						</tr>
					))}
				</tbody>
			</table>
		</CalendarEl>
	)
}

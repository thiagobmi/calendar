<script lang="ts">
	import Calendar from '@event-calendar/core';
	import TimeGrid from '@event-calendar/time-grid';
	import ResourceTimeGrid from '@event-calendar/resource-time-grid';
	import ResourceTimeline from '@event-calendar/resource-timeline';
	import DayGrid from '@event-calendar/day-grid';
	import List from '@event-calendar/list';
	import Interaction from '@event-calendar/interaction';
	import { onMount } from 'svelte';

	let plugins = [TimeGrid, ResourceTimeGrid, ResourceTimeline, DayGrid, List, Interaction];

	function createEvents() {
		let days = [];
		for (let i = 0; i < 7; ++i) {
			let day = new Date();
			let diff = i - day.getDay();
			day.setDate(day.getDate() + diff);
			days[i] = day.getFullYear() + '-' + _pad(day.getMonth() + 1) + '-' + _pad(day.getDate());
		}

		return [
			{ start: days[0] + ' 00:00', end: days[0] + ' 09:00', resourceId: 1, display: 'background', color:'#FE6B64' },
			{ start: days[1] + ' 12:00', end: days[1] + ' 14:00', resourceId: 2, display: 'background' },
			{ start: days[2] + ' 17:00', end: days[2] + ' 24:00', resourceId: 1, display: 'background' },
			{
				start: days[0] + ' 10:00',
				end: days[0] + ' 14:00',
				resourceId: 1,
				title: 'The calendar can display background and regular events',
				color: '#FE6B64'
			},
			// {
			// 	start: days[1] + ' 16:00',
			// 	end: days[2] + ' 08:00',
			// 	resourceId: 2,
			// 	title: 'An event may span to another day',
			// 	color: '#B29DD9'
			// },
			{
				start: days[2] + ' 09:00',
				end: days[2] + ' 13:00',
				resourceId: 2,
				title:
					'Events can be assigned to resources and the calendar has the resources view built-in',
				color: '#779ECB'
			},
			{
				start: days[3] + ' 14:00',
				end: days[3] + ' 20:00',
				resourceId: 1,
				title: '',
				color: '#FE6B64'
			},
			{
				start: days[3] + ' 15:00',
				end: days[3] + ' 18:00',
				resourceId: 1,
				title: 'Overlapping events are positioned properly',
				color: '#779ECB'
			},
			{
				start: days[5] + ' 10:00',
				end: days[5] + ' 16:00',
				resourceId: 2,
				title: { html: 'You have complete control over the <i><b>display</b></i> of events…' },
				color: '#779ECB'
			},
			{
				start: days[5] + ' 14:00',
				end: days[5] + ' 19:00',
				resourceId: 2,
				title: '…and you can drag and drop the events!',
				color: '#FE6B64'
			},
			{
				start: days[5] + ' 18:00',
				end: days[5] + ' 21:00',
				resourceId: 2,
				title: '',
				color: '#B29DD9'
			},
			{
				start: days[1],
				end: days[3],
				resourceId: 1,
				title: 'All-day events can be displayed at the top',
				color: '#B29DD9',
				allDay: true
			}
		];
	}

	function _pad(num: number): string {
		let norm = Math.floor(Math.abs(num));
		return (norm < 10 ? '0' : '') + norm;
	}

	let options = {
		view: 'timeGridWeek',
		height: '87vh',
		headerToolbar: {
			start: '', // prev,next',
			center: 'title',
			end: 'timeGridWeek,listWeek' // resourceTimeGridWeek,timeGridDay,dayGridMonth,resourceTimelineWeek'
		},
		slotMinTime: '07:30',
		slotMaxTime: '22:30',
		allDaySlot: false,
		selectable: false,
		locale: 'pt-BR',
		scrollTime: '09:00:00',
		events: createEvents(),
		views: {
			timeGridWeek: { pointer: true },
			resourceTimeGridWeek: { pointer: true },
			resourceTimelineWeek: {
				pointer: true,
				slotWidth: 80,
				slotLabelFormat: {
					hour: 'numeric',
					minute: '2-digit',
					omitZeroMinute: false
				}
			}
		},
		titleFormat: () => 'Horários',
		snapDuration: '01:00:00',
		slotLabelInterval: '00:30:00', // Show labels every 30 minutes
		displayEventTime: true,
		displayEventEnd: true,
		dayHeaderFormat: { weekday: 'long' },
		dayMaxEvents: false,
		nowIndicator: true,
		// eventStartEditable: false,
		editable: true, // Permite edições gerais
		eventStartEditable: true, // Permite mover o início do evento
		eventDurationEditable: false, // Desabilita redimensionamento
        slotDuration: '00:30:00',

		// IMPORTANTE: adicione esta opção
		dragScroll: true, // Impede rolagem durante arrasto


		// Adicione um manipulador de evento para controlar o drop
		eventResize: function (info: any) {
			const startDate = info.event.start.toDateString();
			const endDate = info.event.end.toDateString();

			// Verificar se o evento passa para outro dia
			if (startDate !== endDate) {
				info.revert();
				return;
			}

			// Verificar limites de horário
			const endHour = info.event.end.getHours() + info.event.end.getMinutes() / 60;

			if (endHour > 22.5) {
				info.revert();
			}
		},

		eventDrop: function (info: any) {
			// Verificar se o evento está dentro dos limites permitidos
			const startTime = info.event.start;
			const endTime = info.event.end;

			// Se o evento está fora dos limites desejados, reverter
			const startHour = startTime.getHours() + startTime.getMinutes() / 60;
			const endHour = endTime ? endTime.getHours() + endTime.getMinutes() / 60 : startHour + 1;

			// Considere 7:30 como limite inferior e 22:30 como limite superior
			if (startHour < 7.5 || endHour > 22.5 || startHour >= 22.5) {
				info.revert(); // Reverte o arrasto se fora dos limites
			}
		}
	};

	let darkMode = false;

	function toggleDarkMode() {
		darkMode = !darkMode;
		updateTheme();
	}

	function updateTheme() {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			document.body.classList.add('ec-dark');
			document.body.style.backgroundColor = '#22272e';
			document.body.style.color = '#adbac7';
		} else {
			document.documentElement.classList.remove('dark');
			document.body.classList.remove('ec-dark');
			document.body.style.backgroundColor = '#ffffff';
			document.body.style.color = '#212529';
		}
	}
    //TODO: https://fullcalendar.io/demos RESOURCE TIMELINE = room/teacher example
	// Initialize dark mode state on component mount
	onMount(() => {
		// Check for system preference or saved preference
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (prefersDark) {
			darkMode = true;
		}
		updateTheme();

		// Add listener for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			darkMode = e.matches;
			updateTheme();
		});
	});
</script>

<div class="w-full">
	<header class="flex flex-row items-center justify-between p-4">
		<h4 class="text-lg font-semibold">
			<a class="hover:underline">PampaTime</a> Demo
		</h4>
        <button
        class="toggle-dark-button rounded-full p-2 hover:bg-gray-200 focus:outline-none dark:hover:bg-gray-700"
        title="Toggle dark mode"
        on:click={toggleDarkMode}
    >
        {#if !darkMode}
            <svg class="light h-1 w-1" focusable="false" viewBox="0 0 32 32"
                ><path
                    d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z"
                    fill="currentColor"
                ></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"
                ></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path
                    d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z"
                    fill="currentColor"
                ></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path
                    d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z"
                    fill="currentColor"
                ></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path
                    d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z"
                    fill="currentColor"
                ></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg
            >
        {:else}
            <svg class="dark h-6 w-6" focusable="false" viewBox="0 0 32 32"
                ><path
                    d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z"
                    fill="currentColor"
                ></path></svg
            >
        {/if}
    </button>
	</header>
	<main class="w-full">
		<div class="mx-auto max-h-10/12 max-w-10/12 overflow-hidden">
			<Calendar {plugins} {options} />
		</div>
	</main>
</div>

<style global>
	body {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
			sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
		padding: 0 40px;
		background-color: #ffffff;
		color: #212529;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	@media (max-width: 575.98px) {
		body {
			padding: 0;
		}
		html {
			font-size: 12px;
		}
		h4 {
			margin-top: 0;
		}
	}

	.row {
		display: flex;
	}

	.col {
		flex: 1 1 0%;
		min-width: 0;
		max-width: 100%;
	}

	.ec {
		height: 640px;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.ec.ec-day-grid {
		height: 400px;
	}

	@media (min-width: 576px) {
		.ec {
			height: 700px;
		}
		.ec.ec-day-grid {
			height: 500px;
		}
	}

	@media (min-width: 992px) {
		.ec {
			height: 800px;
		}
		.ec.ec-day-grid {
			height: 700px;
		}
	}

	@media (min-width: 1200px) {
		.ec.ec-day-grid {
			height: 800px;
		}
	}

	/* More specific selectors if needed */
	.ec-time-grid .ec-day-head,
	.ec-resource-time-grid .ec-day-head {
		font-weight: bold;
	}

	.ec-time-grid .ec-time,
	.ec-resource-time-grid .ec-time {
		font-weight: bold;
	}

	/* Light Theme Calendar Variables */
	.ec {
		--ec-border-color: #ddd;
		--ec-event-border-color: rgba(0, 0, 0, 0.1);
		--ec-today-bg-color: rgba(255, 220, 40, 0.15);
		--ec-highlight-color: rgba(188, 232, 241, 0.3);
		--ec-bg-event-color: rgba(108, 117, 125, 0.3);
		--ec-text-color: #212529;
		--ec-today-fg-color: #0a58ca;
		--ec-button-hover-bg-color: #f0f0f0;
	}

	/* Dark Theme */
	body.ec-dark {
		background: #22272e;
		color: #adbac7;
	}

	/* Calendar specific dark mode styles */
	.dark .ec,
	body.ec-dark .ec {
		--ec-border-color: #444c56;
		--ec-event-border-color: rgba(0, 0, 0, 0.2);
		--ec-today-bg-color: rgba(255, 220, 40, 0.15);
		--ec-highlight-color: rgba(188, 232, 241, 0.3);
		--ec-bg-event-color: rgba(73, 80, 87, 0.3);
		--ec-text-color: #adbac7;
		--ec-today-fg-color: #539bf5;
		--ec-button-hover-bg-color: #444c56;
		background-color: #2d333b;
		color: #adbac7;
	}

	/* SVG icons display control */
	:root:not(.dark) .dark,
	body:not(.ec-dark) .dark {
		display: none;
	}

	:root.dark .light,
	body.ec-dark .light {
		display: none;
	}

	.toggle-dark-button {
		color: inherit;
		border: 0;
		background: 0 0;
		opacity: 0.8;
		cursor: pointer;
	}

	.toggle-dark-button svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	.ec-timeline .ec-time,
	.ec-timeline .ec-line {
		width: 80px;
	}
</style>

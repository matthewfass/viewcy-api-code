let data;

fetch("https://www.viewcy.com/api/o/tildaskitchen/courses")
	.then((response) => response.json())
	.then((responseData) => {
		data = responseData;
		outputEvents(data);
	})
	.catch((error) => {
		console.log("An error occurred:", error);
	});

function outputEvents(data) {
	const container = document.getElementById("app");

	// Iterate over the data
	data.data.forEach((item) => {
		// Create a card element
		const card = document.createElement("div");
		card.classList.add("card");

		// Create an image element
		const image = document.createElement("img");
		image.src = item.featured_image;
		card.appendChild(image);

		// Create a title element
		const title = document.createElement("h2");
		title.textContent = item.name;
		card.appendChild(title);

		// Create a start time element
		const startTime = document.createElement("h3");
		const startsAt = new Date(item.events[0].starts_at);
		const startTimeValue = startsAt.toLocaleString([], {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
		startTime.textContent = startTimeValue;
		card.appendChild(startTime);

		// // Create an end time element
		// const endTime = document.createElement("div");
		// const endTimeValue = new Date(item.events[0].ends_at).toLocaleString([], {
		// 	year: "numeric",
		// 	month: "long",
		// 	day: "numeric",
		// 	hour: "numeric",
		// 	minute: "numeric",
		// });
		// endTime.textContent = `${endTimeValue}`;
		// card.appendChild(endTime);

		// Create a ticket button
		const ticketButton = document.createElement("a");
		ticketButton.href = item.events[0].book_url;
		ticketButton.textContent = "Details";
		ticketButton.classList.add("button"); // Add the "button" class
		ticketButton.target = "_blank"; // Open link in a new tab
		card.appendChild(ticketButton);


		// Create a space element
		const space1 = document.createElement("div");
		space1.innerHTML = `<br>`;
		card.appendChild(space1);

		// Create a description element
		const description = document.createElement("div");
		description.innerHTML = item.description;
		card.appendChild(description);

		// Create a space element
		const space2 = document.createElement("div");
		space2.innerHTML = `<br><br>`;
		card.appendChild(space2);

		// Append the card to the container
		container.appendChild(card);
	});
}

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
	data.data.forEach((item, index) => {
		// Create a card element
		const card = document.createElement("div");
		card.style =
			"background-color: white; margin-bottom: 20px; padding:20px; border-radius: 20px;";
		card.classList.add("card");

		// Create an anchor element for the image
		const imageLink = document.createElement("a");
		imageLink.href = item.events[0].book_url;
		imageLink.target = "_blank"; // Open link in a new tab
		card.appendChild(imageLink);

		// Create an image element
		const image = document.createElement("img");
		image.src = item.featured_image;
		image.style = "border-radius: 20px;";
		imageLink.appendChild(image); // Append the image to the anchor element

		// Create a title element
		const title = document.createElement("h2");
		title.textContent = item.name;
		title.style = "text-transform: uppercase; margin: 10px 0 0 0;";
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

		// Create a ticket button
		const ticketButton = document.createElement("a");
		ticketButton.href = item.events[0].book_url;
		ticketButton.textContent = "Tickets/RSVP";
		ticketButton.style =
			"display: inline-block; padding: 8px 16px; background-color: #D50C52; color: white; text-decoration: none; border-radius: 4px; transition: background-color 0.3s; font-weight:bold; font-size: 1.2em; text-transform: uppercase; margin-bottom: 20px;";
		ticketButton.classList.add("button"); // Add the "button" class
		ticketButton.target = "_blank"; // Open link in a new tab
		card.appendChild(ticketButton);

		// Create a show/hide button
		const toggleButton = document.createElement("div");
		toggleButton.textContent = "More";
		toggleButton.style =
			"margin: 4px 0; font-size:1.2em; cursor: pointer; color: #D50C52;";
		toggleButton.classList.add("button"); // Add the "button" class
		card.appendChild(toggleButton);

		// Create a details container
		const details = document.createElement("div");
		details.id = "details-" + index;
		details.style.display = "none"; // Hide the details initially
		card.appendChild(details);

		// Create a space element
		const space1 = document.createElement("div");
		space1.innerHTML = `<br>`;
		details.appendChild(space1);

		// Create a description element
		const description = document.createElement("div");
		description.innerHTML = item.description;
		details.appendChild(description);

		// Create a space element
		const space2 = document.createElement("div");
		space2.innerHTML = `<br><br>`;
		details.appendChild(space2);

		// Add click event listener to the toggleButton
		toggleButton.addEventListener("click", function () {
			const detailsDiv = document.getElementById("details-" + index);
			if (detailsDiv.style.display == "none") {
				detailsDiv.style.display = "block";
				toggleButton.textContent = "Less";
			} else {
				detailsDiv.style.display = "none";
				toggleButton.textContent = "More";
			}
		});

		// Append the card to the container
		container.appendChild(card);
	});
}

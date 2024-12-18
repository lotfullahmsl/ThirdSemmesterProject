// // Mock function to simulate fetching most-rated articles based on selected topic
fetch("http://localhost:3002/get-topics")
        .then((response) => response.json())
        .then((data) => {
          const dropdown = document.getElementById("topic-dropdown");
          data.forEach((topic) => {
            const option = document.createElement("option");
            option.value = topic.topic_name; // Use the topic name as value
            option.textContent = topic.topic_name; // Set the visible text of the option
            dropdown.appendChild(option);
          });
        })
        .catch((error) => {
          console.error("Failed to load topics:", error);
          alert("Failed to load topics. Please try again.");
        });

      // Handle topic selection and load articles
      const topicDropdown = document.getElementById("topic-dropdown");
      const mostRatedList = document.getElementById("most-rated");
      const loadButton = document.getElementById("load-articles");
      const loadingDiv = document.getElementById("loading"); // Loading spinner div

      topicDropdown.addEventListener("change", () => {
        const selectedTopic = topicDropdown.value;

        // Show loading spinner while fetching articles
        loadingDiv.style.display = "inline-block";

        // Simulate fetching articles (could be an actual API call here)
        setTimeout(() => {
          mostRatedList.innerHTML = ""; // Clear the list before adding new items
          const mostRatedArticles = getMostRatedArticles(selectedTopic);

          // Add each article to the Most Rated list
          mostRatedArticles.forEach((article) => {
            const li = document.createElement("li");
            li.textContent = article;
            mostRatedList.appendChild(li);
          });

          // Hide loading spinner after articles are added
          loadingDiv.style.display = "none";
        }, 1000); // Simulating a delay of 1 second
      });

      // Mock function to simulate fetching most-rated articles based on selected topic
      function getMostRatedArticles(topic) {
        const mockData = {
            "web-development": [
            "HTML Best Practices",
            "CSS for Beginners",
            "JavaScript Essentials",
          ],
          dsa: [
            "Introduction to DSA",
            "Top Sorting Algorithms",
            "Understanding Binary Trees",
          ],
          "mobile-development": [
            "Flutter Basics",
            "React Native Guide",
            "Swift for iOS Development",
          ],
        };
        return mockData[topic] || [];
      }
    
let postsId = document.getElementById("posts");

async function getData() {
  try {
    const getDataFetch = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    if (!getDataFetch.ok) {
      throw new Error("Network response was not ok");
    }
    return getDataFetch.json();
  } catch (error) {
    console.log(error);
  }
}

async function showData() {
  let posts;

  try {
    posts = await getData();

    postsId.innerHTML = "";

    posts.forEach((post) => {
      let li = document.createElement("li");
      let xBtn = document.createElement("button");

      li.textContent = post.title;
      xBtn.textContent = "X";
      li.setAttribute("data-id", post.id);
      li.appendChild(xBtn);
      postsId.appendChild(li);

      deletePost(xBtn);
    });
    filter();
  } catch (error) {
    console.log(error);
  }
}

async function filter() {
  let filterInput = document.getElementById("filterId");

  filterInput.addEventListener("input", () => {
    let filterValue = filterInput.value.toLowerCase();
    let lis = postsId.getElementsByTagName("li");
    for (let i = 0; i < lis.length; i++) {
      let title = lis[i].textContent.toLowerCase();
      if (title.includes(filterValue)) {
        lis[i].style.display = "block";
      } else {
        lis[i].style.display = "none";
      }
    }
  });
}

async function deletePost(xBtn) {
  xBtn.addEventListener("click", async (event) => {
    if (event.target.tagName === "BUTTON") {
      let postId = event.target.parentElement.getAttribute("data-id");
      let url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      try {
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("failed to delete");
        }

        event.target.parentElement.remove();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  });
}

showData();

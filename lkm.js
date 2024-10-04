document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Highlight active link in navigation
    const navLinks = document.querySelectorAll('nav a');
    window.addEventListener('scroll', () => {
        const currentSection = Math.round(window.scrollY / window.innerHeight);
        navLinks.forEach((link, index) => {
            if (index === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Comment section functionality (assuming a form with id="comment-form" and a div with id="comments")
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments');

    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const commenterName = this.querySelector('#name').value;
        const commentText = this.querySelector('#comment').value;
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `<strong>${commenterName}</strong>: ${commentText}`;
        commentsContainer.appendChild(comment);
        this.reset();
    });

    // Search functionality (assuming an input field with id="search-input" and a container with class="post")
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        document.querySelectorAll('.post').forEach(post => {
            const postContent = post.textContent.toLowerCase();
            if (postContent.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });

    // Social media sharing (replace example.com with your actual blog post URL)
    document.querySelectorAll('.social-share').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = encodeURIComponent('https://example.com');
            let shareUrl;
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?url=${url}`;
                    break;
            }
            window.open(shareUrl, '_blank');
        });
    });

    // Your other JavaScript code can go here...

});

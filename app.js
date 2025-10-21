// View Birthday Wishes for Cheata - Supabase Version

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ View page initialized');

    // Check if Supabase is loaded
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase not loaded! Check supabase-config.js');
        return;
    }

    const wishesGallery = document.getElementById('wishesGallery');
    const wishCounter = document.getElementById('wishCounter');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');

    // Load all wishes on page load
    loadWishes();

    async function loadWishes() {
        try {
            // Show loading
            loadingState.style.display = 'flex';
            wishesGallery.classList.add('hidden');
            emptyState.classList.add('hidden');

            // Fetch all wishes from database
            const { data: wishes, error } = await supabase
                .from('birthday_wishes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Update wish counter
            wishCounter.textContent = wishes.length;

            // Hide loading
            loadingState.style.display = 'none';

            // Display wishes
            if (wishes.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            }

            // Render wishes
            wishesGallery.innerHTML = '';
            wishes.forEach(wish => {
                const wishElement = createWishElement(wish);
                wishesGallery.appendChild(wishElement);
            });
            
            wishesGallery.classList.remove('hidden');

        } catch (error) {
            console.error('Error loading wishes:', error);
            loadingState.style.display = 'none';
            emptyState.classList.add('hidden');
            wishesGallery.classList.remove('hidden');
            wishesGallery.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h3>Error Loading Wishes</h3>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" class="btn btn-create">Try Again</button>
                </div>
            `;
        }
    }

    function createWishElement(wish) {
        const div = document.createElement('div');
        div.className = 'wish-card';

        const date = new Date(wish.created_at);
        const dateStr = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).toUpperCase();

        div.innerHTML = `
            <div class="wish-card-inner">
                ${wish.image_url ? `
                    <div class="wish-image-container">
                        <img src="${wish.image_url}" alt="${escapeHtml(wish.your_name)}" class="wish-image">
                    </div>
                ` : ''}
                <div class="wish-content">
                    <div class="wish-header">
                        <img src="image/header.png" alt="Happy Birthday" class="wish-header-img">
                    </div>
                    <h3 class="wish-to">TO: <span class="highlight">CHEATA</span> 🎂</h3>
                    <p class="wish-message">${escapeHtml(wish.birthday_wish)}</p>
                    <div class="wish-footer">
                        <span class="wish-from">FROM: <span class="highlight">${escapeHtml(wish.your_name)}</span></span>
                        <span class="wish-date">${dateStr}</span>
                    </div>
                </div>
            </div>
        `;

        return div;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Auto-refresh every 30 seconds
    setInterval(loadWishes, 30000);

    console.log('✅ Ready to display birthday wishes for Cheata!');
});

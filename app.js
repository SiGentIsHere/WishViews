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

        // Check if photo exists
        const hasPhoto = !!wish.image_url;

        div.innerHTML = `
            <div class="wish-card-content ${!hasPhoto ? 'no-photo' : ''}">
                <!-- Photo Left (if exists), Message Right -->
                <div class="wish-body">
                    <!-- Photo (only if exists) -->
                    ${hasPhoto ? `
                    <div class="wish-photo">
                        <img src="${wish.image_url}" alt="Photo from ${escapeHtml(wish.your_name)}">
                    </div>
                    ` : ''}

                    <!-- Message and Signature -->
                    <div class="wish-details">
                        <!-- TO: Recipient (top right) -->
                        <div class="wish-to">
                            TO: <span class="wish-to-name">${escapeHtml(wish.friend_name) || 'Friend'}</span>
                        </div>

                        <!-- Birthday Message -->
                        <p class="wish-message">${escapeHtml(wish.birthday_wish)}</p>

                        <!-- Signature -->
                        <div class="wish-signature">
                            <div class="wish-stars">✦ ✦ ✦ ✦</div>
                            <div class="wish-from">
                                FROM: <span class="wish-from-name">${escapeHtml(wish.your_name)}</span>
                            </div>
                            <div class="wish-date">${dateStr}</div>
                        </div>
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

    // Auto-refresh every 60 seconds
    setInterval(loadWishes, 600000);

    console.log('✅ Ready to display birthday wishes for Cheata!');
});

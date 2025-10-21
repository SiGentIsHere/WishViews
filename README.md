# 🎉 Birthday Wishes View Page

This is the **viewing page** for Cheata to see all received birthday wishes!

## 🌐 Purpose

This is a **private page** for Cheata to:
- View all birthday wishes from friends
- See photos and messages
- Count total wishes received
- Auto-refreshes every 30 seconds

## 🚀 Deployment

This is designed to be deployed separately on **GitHub Pages**.

### Setup Steps:

1. **Create a new GitHub repository** (e.g., `birthday-view`)
2. **Make it private** (optional, to keep it only for Cheata)
3. **Push this folder** to the repository:
   ```bash
   cd view-wishes
   git init
   git add .
   git commit -m "Birthday wishes viewing site for Cheata"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/birthday-view.git
   git push -u origin main
   ```
4. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages
   - Select `main` branch
   - Click Save
5. **Keep this link private**: `https://YOUR_USERNAME.github.io/birthday-view/`

## 📁 Files

- `index.html` - View wishes page
- `style.css` - Mobile-first responsive styling
- `app.js` - Load and display logic
- `supabase-config.js` - Database configuration
- `image/` - Header and background images

## 🔧 Technology

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL + Storage)
- **Hosting**: GitHub Pages

## 🎨 Features

- ✅ Mobile-first responsive gallery
- ✅ Wish counter
- ✅ Beautiful card display
- ✅ Auto-refresh every 30 seconds
- ✅ Shows all wishes from friends

## 🔒 Security

Keep this link **private** and only share with Cheata!

---

Made with ❤️ for Cheata's Birthday

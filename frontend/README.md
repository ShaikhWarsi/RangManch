# Frontend - AC-DC Application

A modern React frontend for the AC-DC cultural heritage platform, providing an immersive digital experience for exploring traditional artisans and their crafts.

## 🎨 **Features**

### **User Experience**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, intuitive interface with smooth animation
- **Interactive Gallery**: Rich media display for artisan poducts
- **State Management**: Efficient data flow with React hooks

### **Performance**
- **Code Splitting**: Optimized bundle loading
- **Lazy Loading**: Images and components loaded on demand
- **Caching**: Intelligent data caching for better UX
- **SEO Ready**: Meta tags and structured data

## 🛠 **Installation & Setup*

### **1. Install Dependences**
```bash
npm install
```

### **2. Environment Configuration**
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:3001/api/v1
REACT_APP_ENV=development
```

### **3. Available Scripts**
```bash
npm start       # Development server (http://localhost:3000)
npm run build   # Production build
npm test        # Run tests
npm run eject   # Eject from Create React App (one-way operation)
```

## 📁 **Project Structure**

```
frontend/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components
│   │   ├── artisan/       # Artisan-related components
│   │   └── product/       # Product display components
│   ├── pages/             # Page-level components
│   │   ├── Home.js        # Homepage
│   │   ├── Artisans.js    # Artisans listing
│   │   └── About.js       # About page
│   ├── services/          # API service functions
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── styles/            # CSS and styling files
│   └── App.js             # Main App component
├── package.json           # Dependencies and scripts
└── README.md              # This documentation
```

## 🎯 **Key Components**

### **Artisan Showcase**
- Profile cards with detailed information
- Product galleries with high-quality images
- Contact and inquiry forms
- Location and cultural context

### **Product Display**
- Grid and list view options
- Advanced filtering and search
- Detailed product pages
- Review and rating system

### **Interactive Features**
- Smooth page transitions
- Modal dialogs for product details
- Dynamic content loading
- Error boundary handling

## 🎨 **Design System**

### **Color Palette**
- Primary: Cultural heritage colors
- Secondary: Modern complementary tones
- Accent: Call-to-action highlights

### **Typography**
- Headings: Bold, impactful fonts
- Body: Clean, readable text
- Cultural: Traditional script elements

### **Components**
- Cards: Consistent content containers
- Buttons: Interactive elements
- Forms: User input controls
- Navigation: Intuitive menu system

## 📱 **Responsive Design**

### **Breakpoints**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### **Mobile Optimizations**
- Touch-friendly interfaces
- Optimized image loading
- Simplified navigation
- Performance optimizations

## 🚀 **Performance Features**

### **Optimization Techniques**
- Code splitting by route
- Image lazy loading
- Component memoization
- Bundle size optimization

### **Development Tools**
- React DevTools integration
- Performance monitoring
- Error tracking
- Hot module replacement

## 🔧 **Development Guidelines**

### **Code Standards**
- ESLint configuration for code quality
- Prettier for consistent formatting
- Component naming conventions
- Prop-type validation

### **Best Practices**
- Functional components with hooks
- Separation of concerns
- Reusable component design
- Accessibility compliance

## 🌐 **Browser Support**

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📦 **Build & Deployment**

### **Production Build**
```bash
npm run build
```

### **Deployment Options**
- Netlify (recommended)
- Vercel
- AWS S3 + CloudFront
- Any static hosting service

### **Environment Variables**
```env
REACT_APP_API_URL=https://your-api-domain.com/api/v1
REACT_APP_ENV=production
```

## 🎯 **Key Features for Judges**

1. **Modern Architecture**: React hooks, functional components
2. **Performance**: Code splitting, lazy loading, optimization
3. **User Experience**: Responsive design, smooth interactions
4. **Accessibility**: WCAG compliance considerations
5. **Maintainability**: Clean code structure, documentation
6. **Scalability**: Component-based architecture

---

**Ready for production deployment and showcasing! 🚀**

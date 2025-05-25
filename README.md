# 🚗 AutoVibe - AI-Powered Car Dealership Platform

AutoVibe is a modern, AI-powered car dealership platform that combines elegant design with cutting-edge technology to provide an immersive car buying experience.

## 🌟 Features

### 💬 AI Chatbot Assistant
- Real-time customer support
- Vehicle recommendations
- Instant answers to FAQs
- Context-aware responses using AWS Bedrock
- Semantic search capabilities via Pinecone

### 🚙 Vehicle Catalog
- Categorized vehicle listings
- Detailed specifications
- Real-time availability
- Dynamic filtering
- Interactive vehicle cards

### 📊 Finance Calculator
- EMI calculation
- Customizable loan terms
- Down payment options
- Interest rate simulation
- Instant payment summaries

### 🎯 Core Features
- Test drive scheduling
- Contact form with notifications
- Responsive design
- Smooth animations
- Social media integration

## 🏗️ Architecture

The chatbot implementation follows this architecture:

<img src="https://github.com/sahil16-12/AutoVibe/raw/main/public/AutoMobile%20ChatBot%20Architecture.png" alt="AutoMobile ChatBot Architecture" width="400"/>

### Components:
- **User Interface**: React-based web application
- **AWS Services**: 
  - Titan Embedding Bedrock for vector embeddings
  - Amazon Nova Bedrock for natural language processing
- **Pinecone**: Vector database for semantic search
- **API Layer**: Next.js API routes

## 🛠️ Technology Stack

### Frontend
- Next.js 13+
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Backend
- Node.js
- AWS SDK
- MongoDB
- Pinecone DB

### DevOps
- Vercel deployment
- AWS Cloud infrastructure
- Environment configuration

## 🌐 Live Demo

Experience AutoVibe in action: [AutoVibe Live Demo](https://auto-vibe-neon.vercel.app/)

> Note: For the best experience, use modern browsers like Chrome, Firefox, or Edge.

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/autovibe.git
cd autovibe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
AWS_REGION=your_region
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX_NAME=your_index_name
MONGODB_URI=your_mongodb_uri
```

4. Run the development server:
```bash
npm run dev
```

## 🚀 Usage

### Vehicle Categories
- Browse through different vehicle categories
- Click on categories to view available vehicles
- Check detailed specifications and features

### Test Drive Booking
1. Navigate to the Book Ride section
2. Fill in personal details
3. Select preferred vehicle
4. Choose date and time
5. Submit booking

### Finance Calculator
1. Enter vehicle price
2. Set down payment
3. Choose loan term
4. Adjust interest rate
5. View calculated EMI and total costs

### AI Chat Assistant
- Click the chat icon in the bottom-right corner
- Type your query
- Receive instant, context-aware responses

## 📱 Responsive Design

AutoVibe is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes

## 🎨 UI/UX Features

- Smooth scroll animations
- Interactive hover effects
- Dynamic loading states
- Floating action buttons
- Toast notifications
- Modal dialogs
- Form validations

## 🔒 Security

- AWS IAM authentication
- API rate limiting
- CORS protection
- Input sanitization
- Error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Contact

- Email: sahil16december@gmail.com
- LinkedIn: [Shahil Vora](https://www.linkedin.com/in/shahil-vora/)
- Twitter: [@ShahilVora](https://twitter.com/ShahilVora)
- Instagram: [@_sahil.16__](https://www.instagram.com/_sahil.16__)

## 🙏 Acknowledgments

- AWS Bedrock team
- Pinecone DB
- Next.js community
- Framer Motion
- Tailwind CSS
- Lucide Icons

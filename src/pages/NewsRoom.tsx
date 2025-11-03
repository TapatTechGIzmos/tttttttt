import React, { useState, useEffect } from 'react';
import { Search, Filter, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';
import { fetchNews, NewsArticle } from '../services/newsService';

export default function NewsRoom() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 10;

  const countries = [
    'All',
    'Algeria',
    'Botswana',
    'Egypt',
    'Ghana',
    'Kenya',
    'Lesotho',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Senegal',
    'South Africa',
    'Tanzania',
    'Uganda',
    'Zambia',
    'Zimbabwe'
  ];

  useEffect(() => {
    const fetchAndUpdateNews = async () => {
      try {
        const newsArticles = await fetchNews();
        setArticles(newsArticles);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news articles');
        setLoading(false);
      }
    };

    fetchAndUpdateNews();
    const interval = setInterval(fetchAndUpdateNews, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category.includes(selectedCategory);
    const matchesCountry = selectedCountry === 'All' || article.country.includes(selectedCountry);
    return matchesSearch && matchesCategory && matchesCountry;
  });

  const pageCount = Math.ceil(filteredArticles.length / articlesPerPage);
  const offset = currentPage * articlesPerPage;
  const currentArticles = filteredArticles.slice(offset, offset + articlesPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Insurance News Room</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {['All', 'Digital', 'InsurTech', 'Regulation', 'Market News'].map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-6">
          {currentArticles.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">
                  <a href={article.url} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h2>
                <div className="flex space-x-2">
                  <FacebookShareButton url={article.url} quote={article.title}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={article.url} title={article.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={article.url} title={article.title}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{article.summary}</p>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {article.category.map((cat) => (
                  <span key={cat} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {cat}
                  </span>
                ))}
                {article.country.map((country) => (
                  <span key={country} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {country}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <span>{article.source}</span>
                <span className="mx-2">•</span>
                <span>{article.date}</span>
              </div>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-8">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center space-x-2"
              previousClassName="px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
              nextClassName="px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
              pageClassName="px-3 py-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50"
              activeClassName="!bg-blue-600 !text-white !border-blue-600"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>
        )}
      </div>
    </div>
  );
}
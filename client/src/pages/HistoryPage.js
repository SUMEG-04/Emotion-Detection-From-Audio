import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Download, 
  Trash2 
} from 'lucide-react';

// Styled Components using the provided color palette
const PageContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  min-height: 100vh;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  color: #1a365d;
  font-size: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: #4c51bf;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #434190;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const TableHeader = styled.th`
  background-color: #f5f7fa;
  color: #1a365d;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e4e9f2;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f4f8;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #4a5568;
  border-bottom: 1px solid #e4e9f2;
`;

const EmotionBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  
  ${({ emotion }) => {
    switch(emotion) {
      case 'Happy': return 'background-color: #D1FAE5; color: #047857;';
      case 'Sad': return 'background-color: #DBEAFE; color: #1E40AF;';
      case 'Angry': return 'background-color: #FEE2E2; color: #991B1B;';
      case 'Neutral': return 'background-color: #F3F4F6; color: #4B5563;';
      default: return 'background-color: #E5E7EB; color: #6B7280;';
    }
  }}
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaginationText = styled.span`
  color: #4a5568;
`;

const FilterModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  z-index: 1000;
  width: 400px;
`;

const HistoryPage = () => {
  // Simulated history data
  const [historyData, setHistoryData] = useState([
    {
      id: 1,
      fileName: 'meeting_recording.mp3',
      uploadDate: '2024-01-15',
      emotion: 'Happy',
      confidence: '85%',
      duration: '2:34'
    },
    {
      id: 2,
      fileName: 'interview_call.wav',
      uploadDate: '2024-01-20',
      emotion: 'Neutral',
      confidence: '92%',
      duration: '1:45'
    },
    {
      id: 3,
      fileName: 'customer_support.wav',
      uploadDate: '2024-01-25',
      emotion: 'Angry',
      confidence: '78%',
      duration: '3:12'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const itemsPerPage = 5;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historyData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownload = () => {
    // Implement CSV download logic
    const csvContent = historyData.map(row => 
      `${row.fileName},${row.uploadDate},${row.emotion},${row.confidence},${row.duration}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'emotion_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearHistory = () => {
    // Implement clear history logic
    setHistoryData([]);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <PageTitle>Emotion Analysis History</PageTitle>
          <ActionButtons>
            <Button onClick={() => setIsFilterModalOpen(true)}>
              <Filter size={16} /> Filter
            </Button>
            <Button onClick={handleDownload}>
              <Download size={16} /> Export
            </Button>
            <Button 
              onClick={handleClearHistory}
              style={{ backgroundColor: '#E53E3E' }}
            >
              <Trash2 size={16} /> Clear
            </Button>
          </ActionButtons>
        </PageHeader>

        <HistoryTable>
          <thead>
            <tr>
              <TableHeader>File Name</TableHeader>
              <TableHeader>Upload Date</TableHeader>
              <TableHeader>Emotion</TableHeader>
              <TableHeader>Confidence</TableHeader>
              <TableHeader>Duration</TableHeader>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fileName}</TableCell>
                <TableCell>{item.uploadDate}</TableCell>
                <TableCell>
                  <EmotionBadge emotion={item.emotion}>
                    {item.emotion}
                  </EmotionBadge>
                </TableCell>
                <TableCell>{item.confidence}</TableCell>
                <TableCell>{item.duration}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </HistoryTable>

        <Pagination>
          <Button 
            onClick={handlePreviousPage} 
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <PaginationText>
            Page {currentPage} of {totalPages}
          </PaginationText>
          <Button 
            onClick={handleNextPage} 
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </Pagination>
      </ContentWrapper>

      {/* Filter Modal (conditionally rendered) */}
      {isFilterModalOpen && (
        <FilterModal>
          <h2>Filter Predictions</h2>
          {/* Add filter options */}
          <Button onClick={() => setIsFilterModalOpen(false)}>Close</Button>
        </FilterModal>
      )}
    </PageContainer>
  );
};

export default HistoryPage;
import { RoomEntity } from '@/models';
import { ROOMS_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import type { PaginationProps } from 'antd';
import { Col, Pagination, Row, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import RoomGridItem from './RoomGridItem';

interface IRoomsResponse {
  total: number;
  items: RoomEntity[];
}

const pageSize = 12; // Number of data items per page

export default function RoomGrid() {
  const apiRoom = useApiClient(ROOMS_PATH);
  const [rooms, setRooms] = useState<IRoomsResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRoom.getAll({
        isActive: true, // can rent or want to show public
        limit: pageSize,
        offset: pageSize * (currentPage - 1),
      });

      if (response?.success) {
        setRooms({
          total: response.data?.count ?? 0,
          items: response.data.data,
        });
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Skeleton loading={isLoading}>
        <Row className="flex flex-wrap gap-4 gap-y-10 justify-evenly">
          {rooms?.items.map(
            (room, index) =>
              room && (
                <Col key={`room-grid-item-${index}`}>
                  <RoomGridItem room={room} />
                </Col>
              ),
          )}
        </Row>
        <div className="flex justify-end">
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={rooms?.total}
            pageSize={pageSize}
            className="mt-4 pr-6"
          />
        </div>
      </Skeleton>
    </div>
  );
}

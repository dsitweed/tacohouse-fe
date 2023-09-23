import { Row, Col, Typography, Button, Card } from 'antd';
import { BsArrowRight, BsCursorFill } from 'react-icons/bs';
import img1 from '@/assets/images/example_images/budget-hotel-attraction-img-1-min.jpg';
import img2 from '@/assets/images/example_images/budget-hotel-attraction-img-2-min.jpg';
import img3 from '@/assets/images/example_images/budget-hotel-attraction-img-3-min.jpg';
import img4 from '@/assets/images/example_images/budget-hotel-attraction-img-4-min.jpg';
import img5 from '@/assets/images/example_images/budget-hotel-attraction-img-5-min.jpg';
import img6 from '@/assets/images/example_images/budget-hotel-attraction-img-6-min.jpg';
import { Link } from 'react-router-dom';

const portfolioImages = [
  {
    image: img1,
    title: 'Alcatraz Island',
    body: 'Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.',
  },
  {
    image: img2,
    title: "Fisherman's Wharf",
    body: 'Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.',
  },
  {
    image: img3,
    title: 'Golden Gate Park',
    body: 'Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.',
  },
  {
    image: img4,
    title: 'Queen Wilhelmina Tulip Garden',
    body: 'Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.',
  },
  {
    image: img5,
    title: 'Ocean Beach',
    body: 'Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.',
  },
  {
    image: img6,
    title: 'Dutch Windmill',
    body: 'Ornare accumsan congue nunc id facilisis tincidunt ridiculus congue consequat ultrices in mollis netus pellentesque lectus.',
  },
];

export default function AttractionPlace() {
  return (
    <Row gutter={[12, 24]}>
      <Col
        sm={24}
        md={18}
        className="flex items-center justify-center md:justify-start"
      >
        <Typography className="text-4xl">Best of Ha Noi</Typography>
      </Col>
      <Col sm={24} md={6} className="flex justify-center md:justify-end">
        <Button
          className="border-2 py-2 px-4 h-fit w-fit border-purple-600 hover:bg-indigo-50 font-bold text-base"
          icon={<BsCursorFill size={15} />}
        >
          See all
        </Button>
      </Col>
      {/* show all portfolio */}
      <Row gutter={[24, 24]} className="px-2">
        {portfolioImages.map((item) => (
          <Col xs={24} md={12} lg={6}>
            <Card cover={<img src={item.image} />}>
              <Typography className="text-xl mb-2">{item.title}</Typography>
              <Typography.Paragraph
                ellipsis={{
                  rows: 3,
                }}
                className="font-normal"
              >
                {item.body}
              </Typography.Paragraph>
              <Link
                to={'#'}
                className="text-indigo-700 hover:text-black text-base flex items-center gap-3"
              >
                Learn more <BsArrowRight size={20} />
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Row>
  );
}

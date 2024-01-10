import { App, Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// images
import signUpBg from '@/assets/images/sign_up_bg.jpg';
import { useApiClient } from '@/shared/hooks/api';
import { UserRole } from '@/shared/constants';
const { Title, Text } = Typography;

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const apiSignUp = useApiClient('/auth/sign-up');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signUp = async (values: any) => {
    const { email, password, role } = values;
    try {
      const response = await apiSignUp.create({
        email,
        password,
        role,
      });

      if (response && response.success) {
        notification.success({
          message: t('auth.signUpSuccess'),
        });
        navigate('/sign-in');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row
      gutter={[0, 24]}
      justify="center"
      className="bg-white h-full py-8 rounded-md"
    >
      <Col
        xs={{ span: 24, offset: 0 }}
        md={{ span: 12 }}
        lg={{ span: 8, offset: 2 }}
        xxl={{ span: 6, offset: 2 }}
      >
        <Title level={1} className="mt-4 text-center">
          {t('auth.signUp')}
        </Title>

        <Form layout="vertical" onFinish={signUp}>
          <Form.Item
            className="mb-2"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: t('auth.requiredEmail'),
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            className="mb-2"
            label={t('auth.password')}
            name="password"
            rules={[
              {
                required: true,
                message: t('auth.requiredPassword'),
              },
              {
                min: 6,
                message: t('auth.passwordMin6'),
              },
              {
                max: 20,
                message: t('auth.passwordMax20'),
              },
            ]}
          >
            <Input.Password placeholder={t('auth.password')} />
          </Form.Item>

          <Form.Item
            className="mb-2"
            label={t('auth.confirmPassword')}
            name="confirmPassword"
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: t('auth.requiredPassword'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The confirm password that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('auth.password')} />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: 'Please choose your role',
              },
            ]}
            initialValue={UserRole.MANAGER}
          >
            <Select
              placeholder="Select your role"
              options={[
                {
                  label: 'Manager',
                  value: UserRole.MANAGER,
                },
              ]}
            />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              className="bg-primary py-2 text-base flex justify-center items-center"
            >
              {t('auth.signUp')}
            </Button>
          </Form.Item>

          <Text className="font-semibold">
            {t('auth.hadAccount')}{' '}
            <Link to={'/sign-in'}>{t('auth.signIn')}</Link>
          </Text>
        </Form>
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        className="md:pl-10"
      >
        <img
          src={signUpBg}
          alt="sign in image"
          className="m-auto rounded-lg"
          style={{
            maxHeight: '76vh',
          }}
        />
      </Col>
    </Row>
  );
}

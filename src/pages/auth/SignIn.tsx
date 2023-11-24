import { App, Button, Col, Form, Input, Row, Switch, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// images
import signInBg from '@/assets/images/sign_in_bg.jpg';
import googleLogo from '@/assets/images/Google_logo.png';
import facebookLogo from '@/assets/images/Facebook_logo.png';
import githubLogo from '@/assets/images/Github_logo.png';
import { useEffect } from 'react';
import { useApiClient } from '@/shared/hooks/api';
import { useAppDispatch } from '@/store/hooks';
import { authActions } from '@/store/slices/auth.slice';
const { Title, Text } = Typography;

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();
  const apiSignIn = useApiClient('/auth/sign-in');

  useEffect(() => {}, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signIn = async (values: any) => {
    const { email, password, remember } = values;
    console.log({
      values,
    });

    try {
      const response = await apiSignIn.create({
        email,
        password,
      });

      if (response) {
        const { data } = response.data;
        // Save state => redux + show notification + redirect
        dispatch(authActions.signIn(data));
        notification.success({
          message: t('auth.signInSuccess'),
          duration: 1,
        });

        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
    console.log({ remember });
  };

  return (
    <Row gutter={[0, 24]} justify="center" className="h-full px-6 bg-white">
      <Col
        xs={{ span: 24, offset: 0 }}
        md={{ span: 12 }}
        lg={{ span: 8, offset: 2 }}
        xxl={{ span: 6, offset: 2 }}
      >
        <Title level={1} className="mt-4 text-center">
          {t('auth.signIn')}
        </Title>

        <Title level={5} className="text-center">
          {t('auth.continueWith')}
        </Title>
        {/* login by third party */}
        <div className="flex justify-center gap-6 my-3">
          <img
            onClick={() => console.log('login by facebook')}
            src={facebookLogo}
            alt="facebook logo"
            className="w-8 h-8 cursor-pointer"
          />
          <img
            onClick={() => console.log('login by google')}
            src={googleLogo}
            alt=" google logo"
            className="w-8 h-8 cursor-pointer"
          />
          <img
            onClick={() => console.log('login by github')}
            src={githubLogo}
            alt="github logo"
            className="w-8 h-8 cursor-pointer"
          />
        </div>
        <Form layout="vertical" onFinish={signIn}>
          <Form.Item
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
            label={t('auth.rememberMe')}
            name="remember"
            valuePropName="checked"
            style={{
              marginTop: -16,
            }}
          >
            <Switch className="bg-slate-400 mr-2" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              className="bg-primary py-2 text-base flex justify-center items-center"
            >
              {t('auth.signIn')}
            </Button>
          </Form.Item>

          <Text className="font-semibold">
            {t('auth.inviteSentence')}{' '}
            <Link to={'/auth/sign-up'}>{t('auth.signUp')}</Link>
          </Text>
          <br />
          <Link to={'#'}>{t('auth.forgotPassword')}</Link>
        </Form>
      </Col>
      <Col
        xs={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        className="md:pl-10"
      >
        <img
          src={signInBg}
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

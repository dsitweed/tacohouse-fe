import { Button, Col, Form, Input, Row, Switch, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// images
import signInBg from '@/assets/images/sign_in_bg.jpg';
import googleLogo from '@/assets/images/Google_logo.png';
import facebookLogo from '@/assets/images/Facebook_logo.png';
import githubLogo from '@/assets/images/Github_logo.png';
const { Title, Text } = Typography;

export default function SignIn() {
  const { t } = useTranslation();
  return (
    <div className="px-6 bg-white">
      <Row gutter={[0, 24]} justify="center">
        <Col
          xs={{ span: 24, offset: 0 }}
          md={{ span: 12 }}
          lg={{ span: 6, offset: 2 }}
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
          <Form layout="vertical">
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
              initialValue={'test@gmail.com'}
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
              initialValue={'123456'}
            >
              <Input.Password placeholder={t('auth.password')} />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{
                marginTop: -16,
              }}
            >
              <Switch className="bg-slate-400 mr-2" />
              <Text>{t('auth.rememberMe')}</Text>
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
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
          <img
            src={signInBg}
            alt="sign in image"
            className="m-auto rounded-lg h-full"
            style={{
              maxHeight: '76vh',
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

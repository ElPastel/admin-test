import React, { useEffect } from "react"
import { Form, Avatar, Button, Input, Row, Col, message, Upload } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { ROW_GUTTER } from "constants/ThemeConstant"
import Flex from "components/shared-components/Flex"
import { useHistory, useParams } from "react-router-dom"
import { connect, useSelector } from "react-redux"
import { fetchUsers } from "redux/actions/User"

function ClientProfile({ fetchUsers }) {
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const user = useSelector(
    (state) =>
      state.user.users.filter((user) => user.id === Number(params.id))[0]
  )

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const onFinish = () => {
    const key = "updatable"
    message.loading({ content: "Updating...", key })
    setTimeout(() => {
      message
        .success({ content: "Done!", key, duration: 2 })
        .then(() => history.go(-1))
    }, 1000)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  const onUploadAvatar = (info) => {
    const key = "updatable"
    if (info.file.status === "uploading") {
      message.loading({ content: "Uploading...", key, duration: 3 })
      return
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {})
      message.success({ content: "Uploaded!", key, duration: 1.5 })
    }
  }

  const onRemoveAvatar = () => {}

  if (!user) return <p>User does not exist</p>

  const { name, email, username, company, phone, website, address, avatarUrl } =
    user

  const fullAddress = `${address?.street} ${address?.suite}`

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={avatarUrl} icon={<UserOutlined />} />
        <div className="ml-md-3 mt-md-0 mt-3">
          <Upload onChange={onUploadAvatar} showUploadList={false} action="">
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvatar}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          initialValues={{
            name,
            email,
            username,
            phoneNumber: phone,
            website: website,
            address: fullAddress,
            city: address.city,
            postcode: address.zipcode,
            company: company.name,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Company" name="company">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Phone Number" name="phoneNumber">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Website" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item label="Address" name="address">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="City" name="city">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Post code" name="postcode">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                Save Change
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

const mapStateToProps = ({ user }) => {
  const { loading, users } = user
  return { loading, users }
}

const mapDispatchToProps = {
  fetchUsers,
  // deleteUserByFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfile)

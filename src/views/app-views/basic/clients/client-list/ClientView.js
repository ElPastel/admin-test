import React from "react"
import { Avatar, Drawer, Divider } from "antd"
import {
  AppstoreOutlined,
  IdcardOutlined,
  MobileOutlined,
  MailOutlined,
  UserOutlined,
  CompassOutlined,
  GlobalOutlined,
} from "@ant-design/icons"

function ClientView(props) {
  const { data, visible, close } = props

  return (
    <Drawer
      width={300}
      placement="right"
      onClose={close}
      closable={false}
      visible={visible}
    >
      <div className="text-center mt-3">
        <Avatar size={80} src={data?.img} icon={<UserOutlined />} />
        <h3 className="mt-2 mb-0">{data?.name}</h3>
        <span className="text-muted">{data?.company?.name}</span>
      </div>
      <Divider dashed />
      <div className="">
        <h6 className="text-muted text-uppercase mb-3">Account details</h6>
        <p>
          <IdcardOutlined />
          <span className="ml-3 text-dark">id: {data?.id}</span>
        </p>
        <p>
          <UserOutlined />
          <span className="ml-3 text-dark">Username: {data?.username}</span>
        </p>
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
        <p>
          <MobileOutlined />
          <span className="ml-3 text-dark">{data?.phone}</span>
        </p>
        <p>
          <MailOutlined />
          <span className="ml-3 text-dark">
            {data?.email ? data?.email : "-"}
          </span>
        </p>
        <p>
          <CompassOutlined />
          <span className="ml-3 text-dark">{data?.address?.city}</span>
        </p>
      </div>
      <div className="mt-5">
        <h6 className="text-muted text-uppercase mb-3">Company info</h6>
        <p>
          <GlobalOutlined />
          <a href="/#" className="ml-3 text-dark">
            {data?.website}
          </a>
        </p>
        <p>
          <AppstoreOutlined />
          <span className="ml-3 text-dark">{data?.company?.bs}</span>
        </p>
      </div>
    </Drawer>
  )
}

export default ClientView

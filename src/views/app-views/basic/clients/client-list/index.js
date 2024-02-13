import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Card, Table, Tag, Tooltip, message, Button } from "antd"
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons"
import ClientView from "./ClientView"
import AvatarStatus from "components/shared-components/AvatarStatus"
import { fetchUsers, deleteUserByFilter } from "redux/actions/User"
import { connect } from "react-redux"
import Loading from "components/shared-components/Loading"

function ClientList({ loading, users, fetchUsers, deleteUserByFilter }) {
  const [userProfileVisible, setUserProfileVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(false)

  const history = useHistory()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  function handleDeleteUser(userId, e) {
    e.stopPropagation()
    deleteUserByFilter(userId)
    message.success({ content: `Deleted user ${userId}`, duration: 2 })
  }

  function showUserProfile(userInfo, e) {
    e.stopPropagation()
    setUserProfileVisible(true)
    setSelectedUser(userInfo)
  }

  function closeUserProfile() {
    setUserProfileVisible(false)
    setSelectedUser(null)
  }

  const onRow = (record) => {
    return {
      onClick: (e) => history.push(`${record.id}`),
    }
  }

  const tableColumns = [
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={record.img}
            name={record.name}
            subTitle={record.email}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase()
          b = b.name.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      sorter: {
        compare: (a, b) => {
          a = a.address.city.toLowerCase()
          b = b.address.city.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },
    {
      title: "Website",
      dataIndex: "website",
      sorter: {
        compare: (a, b) => {
          a = a.website.toLowerCase()
          b = b.website.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      render: (status) => (
        <Tag className="text-capitalize" color="cyan">
          {status}
        </Tag>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.company.name.toLowerCase()
          b = b.company.name.toLowerCase()
          return a > b ? -1 : b > a ? 1 : 0
        },
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button
              type="primary"
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={(e) => showUserProfile(elm, e)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => handleDeleteUser(elm.id, e)}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  if (loading) return <Loading cover="content" />

  return (
    <Card bodyStyle={{ padding: "0px" }}>
      <Table
        columns={tableColumns}
        dataSource={users}
        rowKey="id"
        onRow={onRow}
        style={{ cursor: "pointer" }}
      />
      <ClientView
        data={selectedUser}
        visible={userProfileVisible}
        close={() => closeUserProfile()}
      />
    </Card>
  )
}

const mapStateToProps = ({ user }) => {
  const { loading, users } = user
  return { loading, users }
}

const mapDispatchToProps = {
  fetchUsers,
  deleteUserByFilter,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)

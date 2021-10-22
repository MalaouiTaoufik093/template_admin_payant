import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
//import ProductListData from "assets/data/product-list.data.json"
import SiteListData from "assets/data/sites-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils'
import UserService from "services/user.service";


const { Option } = Select

const getStockStatus = stockCount => {
	if(stockCount >= 4) {
		return <><Badge status="success" /><span>OK</span></>
	}
	if(stockCount < 3 && stockCount > 0) {
		return <><Badge status="warning" /><span>Besoin de matériel</span></>
	}
	// if(stockCount === 0) {
	// 	return <><Badge status="error" /><span>pas de matériel</span></>
	// }
	return null
}
 

const categories = ['sud', 'nord', 'west', 'ost']

const ProductList = () => {
	let history = useHistory();
	const [rowData, setRowData] = React.useState([]);
	const [list, setList] = useState(rowData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Voir les Détails</span>
				</Flex>
			</Menu.Item>
			{/* <Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item> */}
		</Menu>
	);
	
	const addProduct = () => {
		history.push(`/app/apps/ecommerce/add-product`)
	}
	
	const viewDetails = row => {
		history.push(`/app/apps/ecommerce/edit-product/${row.id_site}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				setList(data)
				setSelectedRows([])
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			setList(data)
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id_site'
		},
		{
			title: 'Bureau',
			dataIndex: 'libelle',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src='/img/logo2.jpg' name={record.libelle}/>
				</div>
			),
			 sorter: (a, b) => utils.antdTableSorter(a, b, 'libelle')
		},
	
		{
			title: 'Code',
			dataIndex: 'code_site',

		 	sorter: (a, b) => utils.antdTableSorter(a, b, 'code_site')
		 },
		{
			title: 'Email',
			dataIndex: 'email',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
		},
		{
			title: 'Nb_Materiel',
			dataIndex: 'nb_materiel',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'nb_materiel')
		},
		{
			title: 'Remarque',
			dataIndex: 'nb_materiel',
			render: stock => (
				<Flex alignItems="center">{getStockStatus(stock)}</Flex>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'nb_materiel')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : SiteListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'zone'
			const data = utils.filterArray(SiteListData, key, value)
			setList(data)
		} else {
			setList(SiteListData)
		}
	}

	useEffect(() => {
		  UserService.get_all_sites().then(
			(response) => {
			  setRowData(response.data);
			},
		  );
		}, []);

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="zone"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div>
				</Flex>
				<div>
					<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Add product</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={list} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
		</Card>
	)
}

export default ProductList

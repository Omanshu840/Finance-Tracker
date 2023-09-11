import { Drawer, Dropdown, Empty} from "antd";
import React, { useEffect, useState } from "react";
import { dateStringToNumber, formatDateToDDWW } from "../../utils";
import { MoreOutlined } from "@ant-design/icons";

const CategoryDetails = (props) => {
    const { isOpen, onClose, category, expenses } = props;
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (expenses) {
            let dataSource = expenses.map((expense) => {
                return {
                    ...expense,
                    date: formatDateToDDWW(expense.date),
                    key: expense._id,
                };
            });
            dataSource.sort(
                (a, b) =>
                    dateStringToNumber(b.date) - dateStringToNumber(a.date)
            );
            setDataSource(dataSource);
        }
    }, [expenses]);

	const items = [
		{
		  key: '1',
		  label: 'Edit',
		},
		{
		  key: '2',
		  label: 'Delete',
		}
	];

    return (
        <div>
            <Drawer
                title={category}
                placement="right"
                onClose={onClose}
                open={isOpen}
                width={"100%"}
            >
                {dataSource && dataSource.length ? (
                    dataSource.map(expense => {
						return (
							<div className="expense-card">
								<div style={{display: "flex", justifyContent: 'space-between'}}>
									<div>
										<div style={{fontSize: '18px', marginBottom: '5px', marginTop: '20px'}}>
											₹{expense.amount}
										</div>
										<div style={{color: 'var(--secColor2)', fontWeight: 'bold', fontSize: '16px'}}>
											{expense.name}
										</div>
									</div>
									<div style={{display: 'flex'}}>
										<div style={{marginTop: '20px', marginRight: '5px', color: 'var(--secColor2)', fontWeight: 'bold'}}>
											{expense.date}
										</div>
										<Dropdown
											menu={{
												items,
											}}
										>
											<MoreOutlined style={{height: '40px', width: '23px', fontSize: '20px'}}/>
										</Dropdown>
									</div>
								</div>
								<div style={{marginTop: '3px'}}>
									{expense.description}
								</div>
								
							</div>
						)
					})
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{marginTop: '200px'}}/>
                )}
            </Drawer>
        </div>
    );
};

export default CategoryDetails;

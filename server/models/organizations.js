module.exports = (db, DataTypes)=>{
    return db.define(
        'organizations',
        {
            organization_id: {
                field:'organization_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            organization_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique:true
            }
        },
        {
            timestamps: false,  //取消时间戳
            freezeTableName: true,//取消自动取名
        }
    )
}
//model就是数据模型
//利用model对数据进行增删改查操作
module.exports = (db, DataTypes) => {
    return db.define(
        'activities',
        {
            activity_id: {
                field:'activity_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            cadre_id:{
                field:'cadre_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            teacher_id:{
                field:'teacher_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            activity_img: {
                type: DataTypes.STRING,
                field: 'activity_img'
            },
            activity_title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            activity_introduce: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            activity_startTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            activity_endTime: {
                type: DataTypes.DATE,
                allowNull: false
            },
            apply_time: {
                type: DataTypes.DATE,
                allowNull: false
            },
            release_time: {
                type: DataTypes.DATE,
                allowNull: true
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            organization_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            passed: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            timestamps: false,  //取消时间戳
            freezeTableName: true,//取消自动取名
        }
    )
}
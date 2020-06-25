module.exports = (db, DataTypes) => {
    return db.define(
        'student_activities',
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                field: 'user_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            activity_id: {
                field: 'activity_id',
                type: DataTypes.INTEGER,
                allowNull: false
            },
            apply_time: {
                field: 'apply_time',
                type: DataTypes.DATE,
                allowNull: false
            },
            passed: {
                field: 'passed',
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
}
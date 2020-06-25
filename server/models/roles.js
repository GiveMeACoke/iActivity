module.exports = (db, DataTypes) => {
    return db.define(
        'roles',
        {
            role_id: {
                field:'role_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            role_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        }
    )
}
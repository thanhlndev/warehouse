package cloud.thanhln.identity.constant;

public class PredefinedRole {
    // Vai trò người dùng
    public static final String USER_ROLE = "USER";

    // Vai trò quản trị viên hệ thống

    public static final String ADMIN_ROLE = "ADMIN";
    // Vai trò quản lý kho hàng
    public static final String WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER";
    public static final String des_WM = "Quản lý kho hàng";
    // Vai trò kiểm soát hàng tồn kho
    public static final String INVENTORY_CONTROLLER = "INVENTORY_CONTROLLER";
    public static final String des_IC = "Kiểm soát hàng tồn kho";
    // Vai trò nhân viên kho hàng
    public static final String WAREHOUSE_OPERATOR = "WAREHOUSE_OPERATOR";
    public static final String des_WO = "Nhân viên kho hàng";
    // Vai trò nhân viên xử lý đơn hàng
    public static final String ORDER_FULFILLMENT = "ORDER_FULFILLMENT";
    public static final String des_OF = "Nhân viên xử lý đơn hàng";
    // Vai trò nhà cung cấp
    public static final String SUPPLIER = "SUPPLIER";
    public static final String des_SUPPLIER = "Nhà cung cấp";

    // Vai trò khách hàng
    //    public static final String CUSTOMER = "CUSTOMER";

    private PredefinedRole() {}
}

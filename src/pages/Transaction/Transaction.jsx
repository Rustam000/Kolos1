import styles from "./Transaction.module.css";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../components/PageHeading/PageHeading";
import CustomSearch from "../../components/UI/CustomSearch/CustomSearch";
import OrderSection from "../../components/OrderSection/OrderSection";
import OrderContainer from "../../components/OrderContainer/OrderContainer";
import {
  getDistributorById,
  getOrdersById,
  transactionActions,
} from "../../redux/transactionSlice";
import ReturnSource from "./ReturnSource/ReturnSource";
import ReturnTarget from "./ReturnTarget/ReturnTarget";

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export default function Transaction() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isReturn = pathname.match("return");
  const navigate = useNavigate();
  if (!id) {
    navigate("/404");
    //TODO: if distributor credentials failed to load > nav to 404
  }
  const { distributor, search, source, target, hoverRowId } = useSelector(
    (state) => state.transaction,
  );
  const dispatch = useDispatch();

  const targetTotalQuantity = target.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const sourceTotalCost = source.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const targetTotalCost = target.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    dispatch(transactionActions.updateSource());
  }, [targetTotalQuantity]);

  useEffect(() => {
    dispatch(getDistributorById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getOrdersById({ id, search }));
  }, [id, search, dispatch]);

  return (
    <div className="fullWidthContainer">
      <PageHeading
        buttonText="Назад"
        backLink={`/distributor/profile/${id}`}
        heading={isReturn ? "Возврат товара" : "Оформление заявки"}
      >
        <CustomSearch
          onChange={(value) => dispatch(transactionActions.setSearch(value))}
        />
      </PageHeading>
      <OrderContainer>
        <OrderSection>
          <ReturnTarget
            parentStyles={styles}
            target={target}
            targetTotalCost={targetTotalCost}
          />
        </OrderSection>
        <OrderSection>
          <ReturnSource
            parentStyles={styles}
            source={source}
            distributor={distributor}
            hoverRowId={hoverRowId}
            sourceTotalCost={sourceTotalCost}
          />
        </OrderSection>
      </OrderContainer>
    </div>
  );
}

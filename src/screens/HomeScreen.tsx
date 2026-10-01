import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts, Product } from '@services/productApi';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';
import { STUDENT, ROOM_LABEL, DEBOUNCE_MS, STALE_TIME_MS, VARIANT } from '@constants/student';
import { THEME } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [keyword, setKeyword] = useState('');
  const [forceError, setForceError] = useState(false); // Dùng để chụp ảnh màn hình lỗi mạng theo yêu cầu đề thi
  const debouncedKeyword = useDebouncedValue(keyword, DEBOUNCE_MS);

  const {
    data: products,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });

  const filtered = (products || []).filter((item) =>
    item.title.toLowerCase().includes(debouncedKeyword.toLowerCase()),
  );

  const showErrorState = isError || forceError;

  return (
    <SafeAreaView style={styles.safeArea}>
      {VARIANT.watermarkAtTop && <Watermark />}

      {/* Header Banner */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>KTXGO</Text>
            <Text style={styles.headerSub}>Giao tận {ROOM_LABEL}</Text>
          </View>
          <TouchableOpacity
            style={styles.simulateBtn}
            onPress={() => setForceError(!forceError)}>
            <Text style={styles.simulateBtnText}>
              {forceError ? '✓ Xem danh sách' : '⚡ Demo Lỗi mạng'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>

      {/* 3 Trạng thái mạng: Pending, Error, Success */}
      {isPending ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={THEME.primary} />
          <Text style={styles.loadingText}>Đang tải món...</Text>
        </View>
      ) : showErrorState ? (
        <View style={styles.centerContainer}>
          <Text style={styles.stateTitle}>LỖI MẠNG</Text>
          <View style={styles.errorBox}>
            <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
            <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => {
                setForceError(false);
                refetch();
              }}>
              <Text style={styles.retryText}>Thử lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlashList
            data={filtered}
            numColumns={2}
            estimatedItemSize={210}
            keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('Detail', { id: item.id })}
              />
            )}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </View>
      )}

      {!VARIANT.watermarkAtTop && <Watermark />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME.background },
  header: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  headerSub: { fontSize: 13, color: '#DBEAFE' },
  simulateBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  simulateBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  searchWrapper: { padding: 10 },
  searchInput: {
    backgroundColor: THEME.surface,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: THEME.border,
    fontSize: 13,
  },
  listContainer: { flex: 1, paddingHorizontal: 6 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  stateTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.text,
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  errorBox: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: { marginTop: 12, color: THEME.textLight, fontSize: 14 },
  errorMssv: {
    fontSize: 18,
    fontWeight: '900',
    color: '#DC2626',
    marginBottom: 6,
  },
  errorText: {
    marginBottom: 20,
    color: THEME.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: '#DC2626',
    width: 180,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#DC2626',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  retryText: { color: '#FFF', fontWeight: '800', fontSize: 15 },
});

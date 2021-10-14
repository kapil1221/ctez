import {
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { MdInfo } from 'react-icons/md';
import { useMemo, useState } from 'react';
import { useOvenStats } from '../../hooks/utilHooks';
import Button from '../button/Button';
import Burn from '../modals/Burn';
import Mint from '../modals/Mint';
import { AllOvenDatum } from '../../interfaces';
import data from '../../assets/data/info.json';

const MintableOverview: React.FC<{ oven: AllOvenDatum | null }> = ({ oven }) => {
  const { stats } = useOvenStats(oven);
  const background = useColorModeValue('white', 'cardbgdark');
  const textcolor = useColorModeValue('text2', 'white');
  const [mintOpen, setMintOpen] = useState<boolean>(false);
  const [burnOpen, setBurnOpen] = useState<boolean>(false);
  const cardbg = useColorModeValue('bg4', 'darkblue');

  const showInfo = useMemo(() => {
    return (
      <div>
        <Flex mr={-2} ml={-2} p={2} borderRadius={14} backgroundColor={cardbg}>
          <Icon fontSize="2xl" color="#B0B7C3" as={MdInfo} m={1} />
          <Text color="gray.500" fontSize="xs" ml={2}>
            {data.find((item) => item.topic === 'oven stats')?.content}
          </Text>
        </Flex>
      </div>
    );
  }, [cardbg]);

  const modals = useMemo(() => {
    if (!oven) {
      return null;
    }
    return (
      <>
        <Mint oven={oven} isOpen={mintOpen} onClose={() => setMintOpen(false)} />
        <Burn oven={oven} isOpen={burnOpen} onClose={() => setBurnOpen(false)} />
      </>
    );
  }, [oven, mintOpen, setMintOpen, burnOpen, setBurnOpen]);

  return (
    <>
      <Stack p={8} spacing={4} backgroundColor={background} borderRadius={16}>
        <Text color={textcolor} fontWeight="700">
          Mintable Overview
        </Text>

        <Divider />

        <Flex w="100%" justifyContent="space-between">
          <Stack>
            <Skeleton isLoaded={stats?.outStandingCtez != null}>
              <Text color="4E5D78" fontWeight="600" fontSize="lg">
                {stats?.outStandingCtez ?? 0} tez
              </Text>
            </Skeleton>

            <Text color="#B0B7C3" fontSize="xs">
              Outstanding
              <Tooltip
                label={showInfo}
                placement="right"
                borderRadius={14}
                backgroundColor={cardbg}
              >
                <span>
                  <Icon opacity="0.3" fontSize="md" color="#B0B7C3" as={MdInfo} m={1} mb={1} />
                </span>
              </Tooltip>
            </Text>
          </Stack>

          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>

          <Stack>
            <Skeleton isLoaded={stats?.maxMintableCtez != null}>
              <Text color="4E5D78" fontWeight="600" fontSize="lg">
                {stats?.maxMintableCtez ?? 0} tez
              </Text>
            </Skeleton>

            <Text color="#B0B7C3" fontSize="xs">
              Maximum Mintable
              <Tooltip
                label={showInfo}
                placement="right"
                borderRadius={14}
                backgroundColor={cardbg}
              >
                <span>
                  <Icon opacity="0.3" fontSize="md" color="#B0B7C3" as={MdInfo} m={1} mb={1} />
                </span>
              </Tooltip>
            </Text>
          </Stack>

          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>

          <Stack>
            <Skeleton isLoaded={stats?.remainingMintableCtez != null}>
              <Text color="4E5D78" fontWeight="600" fontSize="lg">
                {stats?.remainingMintableCtez ?? 0} tez
              </Text>
            </Skeleton>

            <Text color="#B0B7C3" fontSize="xs">
              Remaining Mintable
              <Tooltip
                label={showInfo}
                placement="right"
                borderRadius={14}
                backgroundColor={cardbg}
              >
                <span>
                  <Icon opacity="0.3" fontSize="md" color="#B0B7C3" as={MdInfo} m={1} mb={1} />
                </span>
              </Tooltip>
            </Text>
          </Stack>
        </Flex>

        <HStack w="100%" justifyContent="space-between" spacing="24px">
          <Button variant="outline" w="95%" onClick={() => setMintOpen(true)}>
            Mint
          </Button>

          <Button variant="outline" w="100%" onClick={() => setBurnOpen(true)}>
            Burn
          </Button>
        </HStack>
      </Stack>

      {modals}
    </>
  );
};

export default MintableOverview;
